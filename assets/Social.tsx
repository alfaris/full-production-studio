import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';

const { fontFamily } = loadFont();
const ORANGE = '#F47B20';
const BG = '#15171c';

const Icon: React.FC<{ d: string; light?: boolean }> = ({ d, light }) => (
  <svg width="54" height="54" viewBox="0 0 24 24" fill="none"
       stroke={light ? ORANGE : '#fff'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  idea: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z',
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
  cam: 'M15 10l5-3v10l-5-3M3 7h12v10H3z',
  spark: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
};

const Tile: React.FC<{ icon: string; ar: string; en: string; light?: boolean }> = ({ icon, ar, en, light }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <div style={{
      width: 104, height: 104, borderRadius: 26,
      background: light ? '#f6efe6' : `linear-gradient(145deg, #ff9a45, ${ORANGE})`,
      boxShadow: '0 18px 40px rgba(0,0,0,.45), inset 0 -6px 0 rgba(0,0,0,.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      outline: '2px dashed rgba(255,255,255,.18)', outlineOffset: 8,
    }}>
      <Icon d={icon} light={light} />
    </div>
    <div style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1.2, marginTop: 6 }}>{ar}</div>
    <div style={{ color: '#9aa0aa', fontSize: 18, fontWeight: 600, letterSpacing: 1 }}>{en}</div>
  </div>
);

export const Social: React.FC<{ count: number }> = ({ count }) => (
  <AbsoluteFill style={{
    background: `radial-gradient(900px 500px at 75% 20%, rgba(244,123,32,.16), transparent 60%), ${BG}`,
    fontFamily, padding: '58px 80px', display: 'flex', flexDirection: 'column',
  }}>
    {/* faint grid */}
    <AbsoluteFill style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }} />

    <div style={{ direction: 'rtl', textAlign: 'center', position: 'relative' }}>
      <div style={{ color: '#fff', fontSize: 84, fontWeight: 900, lineHeight: 1.35 }}>
        استوديو <span style={{ color: ORANGE }}>إنتاج</span> متكامل
      </div>
      <div style={{ width: 90, height: 7, borderRadius: 4, background: ORANGE, margin: '10px auto 16px' }} />
      <div style={{ direction: 'ltr', color: '#e8e8ea', fontSize: 40, fontWeight: 700, letterSpacing: 1 }}>
        Full Production Studio
      </div>
    </div>

    <div style={{ direction: 'rtl', display: 'flex', justifyContent: 'space-between', padding: '0 70px', marginTop: 38, position: 'relative' }}>
      <Tile icon={ICONS.idea} ar="أفكار" en="IDEAS" />
      <Tile icon={ICONS.doc} ar="محتوى" en="CONTENT" light />
      <Tile icon={ICONS.cam} ar="موشن" en="MOTION" />
      <Tile icon={ICONS.spark} ar="احترافي" en="PRO" light />
    </div>

    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center',
      color: '#b9bec7', fontSize: 23, fontWeight: 600,
    }}>
      <span style={{ color: ORANGE, fontWeight: 800 }}>{count} AI skills</span> for video creators · Studio Director · Arabic-first
      <span style={{ color: '#6d727c' }}>  ·  Claude · ChatGPT · Gemini · Codex · Cursor</span>
    </div>
  </AbsoluteFill>
);
