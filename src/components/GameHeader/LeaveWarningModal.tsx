// components/GameHeader/LeaveWarningModal.tsx
import "../../styles/componentStyling/leaveWarningModal.css";

type LeaveWarningModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LeaveWarningModal({
  visible,
  onCancel,
  onConfirm
}: LeaveWarningModalProps) {
  if (!visible) return null;

  return (
    <div className="game-overlay-modal">
      <div className="game-warning-modal">
        <h2 className="game-warning-title">⚠️ Are you sure?</h2>
        <p className="game-warning-text">Your progress will be lost if you leave the game.</p>
        <div className="actions">
          <button className="btn secondary" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Leave</button>
        </div>
      </div>
    </div>
  );
}
