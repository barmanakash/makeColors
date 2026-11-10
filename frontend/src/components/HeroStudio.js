import { useEffect, useRef, useState } from 'react';
import './HeroStudio.css';

// A layered, parallax "digital studio" scene that replaces the old
// network graph: a live browser window, a typing code editor, an AI chat,
// the brand colour palette, and tech chips orbiting around it all.
// Pure React + CSS, so there are no extra dependencies.

const STAGE_W = 480;
const STAGE_H = 440;

const SWATCHES = ['#4c7eff', '#38b6a6', '#2ecf82', '#e7a33e', '#c06cff'];

const CODE_LINES = [
  { n: 19, parts: [['k', 'const'], ['p', ' app = '], ['f', 'build'], ['p', '({']] },
  { n: 14, parts: [['p', '  ui: '], ['s', "'React'"], ['p', ',']] },
  { n: 14, parts: [['p', '  api: '], ['s', "'Node'"], ['p', ',']] },
  { n: 17, parts: [['p', '  ai: '], ['f', 'agent'], ['p', '(RAG),']] },
  { n: 3, parts: [['p', '});']] },
  { n: 17, parts: [['k', 'await'], ['p', ' app.'], ['f', 'ship'], ['p', '();']] },
];

const ORBIT_CHIPS = [
  { label: 'React', angle: 0, ring: 'outer' },
  { label: 'Node.js', angle: 120, ring: 'outer' },
  { label: 'LLM', angle: 240, ring: 'outer' },
  { label: 'RAG', angle: 60, ring: 'inner' },
  { label: 'Agents', angle: 240, ring: 'inner' },
];

function HeroStudio() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const update = () =>
      setScale(Math.min(1.1, Math.max(0.5, wrap.clientWidth / STAGE_W)));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const handleMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`);
    stage.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
  };

  const handleLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--ry', '0deg');
    stage.style.setProperty('--rx', '0deg');
  };

  return (
    <div
      className="studio"
      ref={wrapRef}
      style={{ height: STAGE_H * scale }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <div
        className="studio-scaler"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          marginLeft: -STAGE_W / 2,
          transform: `scale(${scale})`,
        }}
      >
        <div className="studio-stage" ref={stageRef}>
          {/* orbit rings */}
          <div className="ring ring--outer">
            {ORBIT_CHIPS.filter((c) => c.ring === 'outer').map((chip) => (
              <span
                className="orbit-arm"
                style={{ '--a': `${chip.angle}deg` }}
                key={chip.label}
              >
                <span className="orbit-chip">
                  <span>{chip.label}</span>
                </span>
              </span>
            ))}
          </div>
          <div className="ring ring--inner">
            {ORBIT_CHIPS.filter((c) => c.ring === 'inner').map((chip) => (
              <span
                className="orbit-arm"
                style={{ '--a': `${chip.angle}deg` }}
                key={chip.label}
              >
                <span className="orbit-chip orbit-chip--teal">
                  <span>{chip.label}</span>
                </span>
              </span>
            ))}
          </div>

          {/* live browser window */}
          <div className="layer layer--win" style={{ '--z': '30px' }}>
            <div className="float" style={{ '--fd': '0s' }}>
              <div className="win">
                <div className="win-bar">
                  <i />
                  <i />
                  <i />
                  <span>yourproduct.com</span>
                </div>
                <div className="win-body">
                  <div className="win-hero">
                    <b className="w60" />
                    <b className="w40" />
                    <span className="win-btn">
                      Get started
                      <em className="ripple" />
                    </span>
                  </div>
                  <div className="win-cards">
                    {[
                      ['38%', '70%', '52%', '88%'],
                      ['80%', '46%', '66%', '34%'],
                      ['44%', '58%', '90%', '62%'],
                    ].map((bars, i) => (
                      <div className="win-card" key={i}>
                        {bars.map((h, j) => (
                          <s key={j} style={{ '--h': h, '--bd': `${j * 0.15 + i * 0.3}s` }} />
                        ))}
                      </div>
                    ))}
                  </div>
                  <svg
                    className="win-cursor"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M4 2l15 9-6.5 1.6L9.6 20 4 2z"
                      fill="#fff"
                      stroke="#0b0e14"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* typing code editor */}
          <div className="layer layer--code" style={{ '--z': '70px' }}>
            <div className="float" style={{ '--fd': '-1.6s' }}>
              <div className="glass code">
                <div className="code-head">
                  <i />
                  <i />
                  <i />
                  <span>app.js</span>
                </div>
                <div className="code-body">
                  {CODE_LINES.map((line, i) => (
                    <div
                      className="code-line"
                      style={{ '--n': line.n, '--i': i }}
                      key={i}
                    >
                      {line.parts.map(([cls, text], j) => (
                        <span className={`c-${cls}`} key={j}>
                          {text}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI chat */}
          <div className="layer layer--chat" style={{ '--z': '90px' }}>
            <div className="float" style={{ '--fd': '-3.1s' }}>
              <div className="glass chat">
                <div className="chat-head">
                  <span className="chat-avatar">AI</span>
                  <div>
                    <strong>Support agent</strong>
                    <small>
                      <i /> online
                    </small>
                  </div>
                </div>
                <div className="chat-msg chat-msg--user" style={{ '--s': '0s' }}>
                  Where is my order?
                </div>
                <div className="chat-msg chat-msg--ai" style={{ '--s': '1.1s' }}>
                  Shipped today — arriving Friday ✓
                </div>
                <div className="chat-typing" style={{ '--s': '2.3s' }}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>

          {/* palette */}
          <div className="layer layer--palette" style={{ '--z': '110px' }}>
            <div className="float" style={{ '--fd': '-4.4s' }}>
              <div className="glass palette">
                <small>makeColors / palette</small>
                <div className="swatches">
                  {SWATCHES.map((hex, i) => (
                    <span
                      className="swatch"
                      data-hex={hex}
                      style={{ '--c': hex, '--sd': `${i * 0.25}s` }}
                      key={hex}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroStudio;
