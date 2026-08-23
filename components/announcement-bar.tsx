import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="site-container announcement-inner">
        <span><Sparkles size={14} strokeWidth={1.7} aria-hidden="true" /> Free UK delivery over £40</span>
        <span className="announcement-secondary">30-day returns</span>
      </div>
    </div>
  );
}
