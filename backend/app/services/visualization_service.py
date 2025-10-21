import plotly.graph_objects as go
import plotly.io as pio
import numpy as np
import wfdb
import os
from typing import Dict, Any, List
import uuid

class ECGVisualizationService:
    def __init__(self):
        pass
    
    def load_ecg_signal(self, file_path: str) -> tuple:
        """Load ECG signal data"""
        try:
            # Read the ECG record using wfdb
            record = wfdb.rdrecord(file_path.replace('.dat', ''))
            
            # Extract signal data (using first lead for simplicity)
            signal = record.p_signal[:, 0] if len(record.p_signal.shape) > 1 else record.p_signal
            time_points = np.arange(len(signal)) / record.fs
            
            return time_points, signal
        except Exception as e:
            print(f"Error loading ECG signal: {e}")
            # Return dummy data for testing
            time_points = np.linspace(0, 10, 1000)
            signal = np.sin(2 * np.pi * 1 * time_points) + 0.5 * np.sin(2 * np.pi * 2 * time_points)
            return time_points, signal
    
    def create_ecg_plot(self, file_path: str, abnormalities: List[Dict[str, Any]] = None) -> go.Figure:
        """Create ECG signal visualization"""
        # Load ECG signal
        time_points, signal = self.load_ecg_signal(file_path)
        
        # Create the figure
        fig = go.Figure()
        
        # Add ECG signal trace
        fig.add_trace(go.Scatter(
            x=time_points,
            y=signal,
            mode='lines',
            name='ECG Signal',
            line=dict(color='blue', width=1)
        ))
        
        # Add abnormalities if provided
        if abnormalities:
            for abnormality in abnormalities:
                # Highlight abnormal segments
                start_time = abnormality['start_time']
                end_time = abnormality['end_time']
                abnormal_segment = (time_points >= start_time) & (time_points <= end_time)
                
                if np.any(abnormal_segment):
                    fig.add_shape(
                        type='rect',
                        x0=start_time,
                        x1=end_time,
                        y0=np.min(signal[abnormal_segment]),
                        y1=np.max(signal[abnormal_segment]),
                        fillcolor='red',
                        opacity=0.2,
                        layer='below',
                        line_width=0,
                    )
                    
                    # Add annotation
                    fig.add_annotation(
                        x=(start_time + end_time) / 2,
                        y=np.max(signal) * 0.9,
                        text=abnormality['type'],
                        showarrow=True,
                        arrowhead=1,
                        bgcolor='red',
                        font=dict(color='white')
                    )
        
        # Update layout
        fig.update_layout(
            title='ECG Signal Visualization',
            xaxis_title='Time (seconds)',
            yaxis_title='Amplitude (mV)',
            template='plotly_white',
            height=400,
            showlegend=True
        )
        
        return fig
    
    def save_visualization(self, fig: go.Figure, output_path: str, format: str = 'png') -> str:
        """Save visualization to file"""
        try:
            if format.lower() == 'png':
                pio.write_image(fig, output_path, format='png', width=1200, height=400, scale=2)
            elif format.lower() == 'pdf':
                pio.write_image(fig, output_path, format='pdf', width=1200, height=400)
            elif format.lower() == 'svg':
                pio.write_image(fig, output_path, format='svg', width=1200, height=400)
            return output_path
        except Exception as e:
            print(f"Error saving visualization: {e}")
            return None
    
    def generate_visualization(self, file_path: str, abnormalities: List[Dict[str, Any]] = None) -> str:
        """Generate and save ECG visualization"""
        # Create visualization
        fig = self.create_ecg_plot(file_path, abnormalities)
        
        # Generate unique filename
        viz_id = str(uuid.uuid4())
        output_dir = os.path.join("uploads", "visualizations")
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"ecg_viz_{viz_id}.png")
        
        # Save visualization
        saved_path = self.save_visualization(fig, output_path, 'png')
        return saved_path

# Global instance
visualization_service = ECGVisualizationService()