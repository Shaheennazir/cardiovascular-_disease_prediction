import plotly.graph_objects as go
import plotly.io as pio
import numpy as np
import wfdb
import os
from typing import Dict, Any, List
import uuid
from app.core import get_logger
from app.core.logging import performance_monitor
from app.core.file_utils import get_visualization_directory

logger = get_logger(__name__)

class ECGVisualizationService:
    def __init__(self):
        pass
    
    @performance_monitor(logger)
    def load_ecg_signal(self, file_path: str) -> tuple:
        """Load ECG signal data"""
        logger.info("Loading ECG signal", file_path=file_path)
        try:
            # Get the absolute base path (without extension)
            logger.info(f"🧩 DEBUG: file_path received -> {file_path}")
            abs_file_path = os.path.abspath(file_path)
            logger.info(f"🧩 DEBUG: absolute path -> {abs_file_path}")
            base_path = os.path.splitext(abs_file_path)[0]
            logger.debug("Base path for wfdb", base_path=base_path)
            
            # Safety check to ensure files exist before calling wfdb
            dat_file = base_path + ".dat"
            hea_file = base_path + ".hea"
            
            if not os.path.exists(dat_file):
                raise FileNotFoundError(f"ECG data file not found: {dat_file}")
            if not os.path.exists(hea_file):
                raise FileNotFoundError(f"ECG header file not found: {hea_file}")
            
            # --- COMPREHENSIVE HEADER FIX ---
            try:
                expected_name = os.path.basename(base_path)
                
                # Read the entire header file
                with open(hea_file, "r", encoding="utf-8") as f:
                    header_lines = f.readlines()
                
                if not header_lines:
                    raise ValueError("Header file is empty")
                
                logger.info(f"📄 Original header first line: {header_lines[0].strip()}")
                
                # Parse the first line
                first_line_parts = header_lines[0].strip().split()
                old_record_name = first_line_parts[0]
                
                # If the record name doesn't match, update the entire header
                if old_record_name != expected_name:
                    logger.info(f"🔧 Fixing header: '{old_record_name}' → '{expected_name}'")
                    
                    # Update first line
                    first_line_parts[0] = expected_name
                    header_lines[0] = " ".join(first_line_parts) + "\n"
                    
                    # Update any other lines that reference the old filename
                    for i in range(1, len(header_lines)):
                        if old_record_name in header_lines[i]:
                            header_lines[i] = header_lines[i].replace(old_record_name, expected_name)
                            logger.info(f"📝 Updated line {i+1}: {header_lines[i].strip()}")
                    
                    # Write the corrected header back
                    with open(hea_file, "w", encoding="utf-8") as f:
                        f.writelines(header_lines)
                    
                    logger.info(f"✅ Header file updated successfully")
                    
                    # Verify the fix
                    with open(hea_file, "r", encoding="utf-8") as f:
                        verify_line = f.readline().strip()
                    logger.info(f"📄 Verified header first line: {verify_line}")
                else:
                    logger.info(f"✅ Header already correct: {expected_name}")
                    
            except Exception as e:
                logger.error("Error fixing header file", error=str(e), exc_info=True)
                raise
            # --- END COMPREHENSIVE HEADER FIX ---
                
            # Read the ECG record using wfdb (with just the base path to avoid PhysioNet downloads)
            record = wfdb.rdrecord(base_path)
            
            # Extract signal data (using first lead for simplicity)
            signal = record.p_signal[:, 0] if len(record.p_signal.shape) > 1 else record.p_signal
            time_points = np.arange(len(signal)) / record.fs
            logger.debug("ECG signal loaded", signal_shape=signal.shape, time_points_shape=time_points.shape)
            
            return time_points, signal
        except Exception as e:
            logger.error("Error loading ECG signal", error=str(e), exc_info=True)
            # Return dummy data for testing
            logger.warning("Using dummy ECG signal for testing")
            time_points = np.linspace(0, 10, 1000)
            signal = np.sin(2 * np.pi * 1 * time_points) + 0.5 * np.sin(2 * np.pi * 2 * time_points)
            return time_points, signal
    
    @performance_monitor(logger)
    def create_ecg_plot(self, file_path: str, abnormalities: List[Dict[str, Any]] = None) -> go.Figure:
        """Create ECG signal visualization"""
        logger.info("Creating ECG plot", file_path=file_path, abnormalities_count=len(abnormalities) if abnormalities else 0)
        # Load ECG signal
        time_points, signal = self.load_ecg_signal(file_path)
        
        # Create the figure
        fig = go.Figure()
        logger.debug("Plotly figure created")
        
        # Add ECG signal trace
        fig.add_trace(go.Scatter(
            x=time_points,
            y=signal,
            mode='lines',
            name='ECG Signal',
            line=dict(color='blue', width=1)
        ))
        logger.debug("ECG signal trace added")
        
        # Add abnormalities if provided
        if abnormalities:
            logger.debug("Adding abnormalities to plot", count=len(abnormalities))
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
        logger.debug("Plot layout updated")
        
        return fig
    
    @performance_monitor(logger)
    def save_visualization(self, fig: go.Figure, output_path: str, format: str = 'png') -> str:
        """Save visualization to file"""
        logger.info("Saving visualization", output_path=output_path, format=format)
        try:
            if format.lower() == 'png':
                pio.write_image(fig, output_path, format='png', width=1200, height=400, scale=2)
            elif format.lower() == 'pdf':
                pio.write_image(fig, output_path, format='pdf', width=1200, height=400)
            elif format.lower() == 'svg':
                pio.write_image(fig, output_path, format='svg', width=1200, height=400)
            logger.info("Visualization saved successfully", output_path=output_path)
            return output_path
        except Exception as e:
            logger.error("Error saving visualization", error=str(e), exc_info=True)
            return None
    
    @performance_monitor(logger)
    def generate_visualization(self, file_path: str, abnormalities: List[Dict[str, Any]] = None) -> str:
        """Generate and save ECG visualization"""
        logger.info("Generating ECG visualization", file_path=file_path, abnormalities_count=len(abnormalities) if abnormalities else 0)
        # Create visualization
        fig = self.create_ecg_plot(file_path, abnormalities)
        
        # Generate unique filename
        viz_id = str(uuid.uuid4())
        output_dir = get_visualization_directory()
        output_path = os.path.join(output_dir, f"ecg_viz_{viz_id}.png")
        logger.debug("Generated output path", output_path=output_path)
        
        # Save visualization
        saved_path = self.save_visualization(fig, output_path, 'png')
        logger.info("ECG visualization generated", saved_path=saved_path)
        return saved_path

# Global instance
visualization_service = ECGVisualizationService()