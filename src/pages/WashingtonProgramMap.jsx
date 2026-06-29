import { useCallback, useEffect, useRef, useState } from 'react';
import './WashingtonProgramMap.css';

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0siiQz8zY1cXvLyO6CUGoSDLoFGua2_rL_cRx78sfrgKQ8o0eVsJx_PaZZyxe6Au6boMQuUzXAt-L/pub?gid=2123026577&single=true&output=csv';

const DEPT_NAME_TO_CODE = {
  Arts: 'arts',
  English: 'english',
  Languages: 'lang',
  Math: 'math',
  Science: 'sci',
  'Social Studies': 'social',
  Theology: 'theo',
  'Health & Wellness': 'hw',
};

const DEPTS = {
  arts:    { l: 'Arts',              h: '#D4537E', bg: '#FBEAF0', dk: '#72243E' },
  english: { l: 'English',           h: '#378ADD', bg: '#E6F1FB', dk: '#0C447C' },
  lang:    { l: 'Languages',         h: '#7F77DD', bg: '#EEEDFE', dk: '#3C3489' },
  math:    { l: 'Math',              h: '#BA7517', bg: '#FAEEDA', dk: '#633806' },
  sci:     { l: 'Science',           h: '#1D9E75', bg: '#E1F5EE', dk: '#085041' },
  social:  { l: 'Social Studies',    h: '#639922', bg: '#EAF3DE', dk: '#27500A' },
  theo:    { l: 'Theology',          h: '#E24B4A', bg: '#FCEBEB', dk: '#501313' },
  hw:      { l: 'Health & Wellness', h: '#888780', bg: '#F1EFE8', dk: '#444441' },
};

const DEPT_ORDER = ['all', 'arts', 'english', 'lang', 'math', 'sci', 'social', 'theo', 'hw'];

// ── CDN helpers ──────────────────────────────────────────────────────────────

function injectLeafletCss() {
  const href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
  if (!document.querySelector(`link[href="${href}"]`)) {
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    document.head.appendChild(el);
  }
}

function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.onload = resolve;
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });
}

// ── Data helpers ─────────────────────────────────────────────────────────────

function parseCsvRows(rows) {
  const locMap = new Map();
  rows.forEach((row) => {
    const name    = row.Location?.trim()    ?? '';
    const address = row.Address?.trim()     ?? '';
    const latStr  = row.Latitude?.trim()    ?? '';
    const lngStr  = row.Longitude?.trim()   ?? '';
    const deptName = row.Department?.trim() ?? '';
    const cls     = row.Class?.trim()       ?? '';
    const desc    = row.Description?.trim() ?? '';

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (!name || isNaN(lat) || isNaN(lng)) {
      console.warn('[WashingtonProgramMap] Skipping row — missing coords:', row);
      return;
    }

    const deptCode = DEPT_NAME_TO_CODE[deptName];
    if (!deptCode) {
      console.warn('[WashingtonProgramMap] Unknown department, skipping:', deptName, row);
      return;
    }

    if (!locMap.has(name)) {
      locMap.set(name, { n: name, a: address, lat, lng, depts: new Map() });
    }

    const loc = locMap.get(name);
    if (!loc.depts.has(deptCode)) {
      loc.depts.set(deptCode, { classes: [], descs: [] });
    }
    const d = loc.depts.get(deptCode);
    if (cls)  d.classes.push(cls);
    if (desc) d.descs.push(desc);
  });

  return Array.from(locMap.values()).map((loc) => ({
    n:     loc.n,
    a:     loc.a,
    lat:   loc.lat,
    lng:   loc.lng,
    d:     Array.from(loc.depts.keys()),
    depts: loc.depts,
  }));
}

// ── Leaflet helpers ───────────────────────────────────────────────────────────

function makeIcon(L, deptCodes) {
  if (deptCodes.length === 1) {
    const h = DEPTS[deptCodes[0]].h;
    return L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30"><path d="M11 0C4.925 0 0 4.925 0 11c0 7.333 11 19 11 19S22 18.333 22 11C22 4.925 17.075 0 11 0z" fill="${h}"/><circle cx="11" cy="11" r="4.5" fill="white" opacity=".9"/></svg>`,
      iconSize:    [22, 30],
      iconAnchor:  [11, 30],
      popupAnchor: [0, -32],
      className:   '',
    });
  }
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="11" fill="white" stroke="#2C2C2A" stroke-width="2.5"/><text x="13" y="17.5" font-size="13" font-family="sans-serif" font-weight="700" text-anchor="middle" fill="#2C2C2A">+</text></svg>`,
    iconSize:    [26, 26],
    iconAnchor:  [13, 13],
    popupAnchor: [0, -15],
    className:   '',
  });
}

function deptTabContent(deptCode, deptData) {
  const dept = DEPTS[deptCode];
  const classes = deptData.classes.filter(Boolean);
  const descs   = deptData.descs.filter(Boolean);
  let html = `<span class="pubadge" style="background:${dept.bg};color:${dept.dk}">${dept.l}</span>`;
  if (classes.length > 0) {
    html += `<div class="puclass">${classes.join(', ')}</div>`;
  }
  if (descs.length > 0) {
    html += `<div class="pudesc">${descs[0]}</div>`;
  }
  if (classes.length === 0 && descs.length === 0) {
    html += `<div class="puph">Course &amp; description coming soon</div>`;
  }
  return html;
}

function makePopup(loc, idx) {
  const multi = loc.d.length > 1;

  if (!multi) {
    const deptCode = loc.d[0];
    const deptData = loc.depts.get(deptCode);
    return `<div class="pu">
      <div class="putitle">${loc.n}</div>
      <div class="puaddr">${loc.a}</div>
      ${deptTabContent(deptCode, deptData)}
    </div>`;
  }

  const tabs = loc.d
    .map(
      (dk, i) =>
        `<button class="putb${i === 0 ? ' act' : ''}" ` +
        `style="${i === 0 ? `background:${DEPTS[dk].h};border-color:${DEPTS[dk].h};color:white` : ''}" ` +
        `data-dd="${dk}" onclick="swt('${idx}','${dk}',this)">${DEPTS[dk].l}</button>`,
    )
    .join('');

  const contents = loc.d
    .map((dk, i) => {
      const deptData = loc.depts.get(dk);
      return `<div class="putc${i === 0 ? ' show' : ''}" id="tc-${idx}-${dk}">${deptTabContent(dk, deptData)}</div>`;
    })
    .join('');

  return `<div class="pu" id="pu-${idx}">
    <div class="putitle">${loc.n}</div>
    <div class="puaddr">${loc.a}</div>
    <div class="putab-bar" id="tb-${idx}">${tabs}</div>
    ${contents}
  </div>`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WashingtonProgramMap() {
  const mapContainerRef = useRef(null);
  const leafletMapRef   = useRef(null);
  const markersRef      = useRef([]);

  const [status,    setStatus]    = useState('loading'); // 'loading' | 'error' | 'ready'
  const [errorMsg,  setErrorMsg]  = useState('');
  const [locs,      setLocs]      = useState([]);
  const [activeDept, setActiveDept] = useState('all');
  const [viewMode,  setViewMode]  = useState('map');

  // Set document title
  useEffect(() => {
    const prev = document.title;
    document.title = 'Washington Program Map | Episcopal High School';
    return () => { document.title = prev; };
  }, []);

  // Load Leaflet + PapaParse from CDN, then fetch CSV
  useEffect(() => {
    injectLeafletCss();
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js'),
    ])
      .then(() => {
        window.Papa.parse(CSV_URL, {
          download:       true,
          header:         true,
          skipEmptyLines: true,
          complete(results) {
            const parsed = parseCsvRows(results.data);
            if (parsed.length === 0) {
              setErrorMsg('No valid rows found in the spreadsheet.');
              setStatus('error');
            } else {
              setLocs(parsed);
              setStatus('ready');
            }
          },
          error(err) {
            setErrorMsg(err.message ?? 'PapaParse fetch failed');
            setStatus('error');
          },
        });
      })
      .catch((err) => {
        setErrorMsg(err.message ?? 'Failed to load map libraries');
        setStatus('error');
      });
  }, []);

  // Initialise Leaflet map once data is ready and the container is in the DOM
  useEffect(() => {
    if (status !== 'ready' || !mapContainerRef.current) return;

    const L   = window.L;
    const map = L.map(mapContainerRef.current, { center: [38.89, -77.04], zoom: 11 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">Carto</a>',
      maxZoom: 19,
    }).addTo(map);
    leafletMapRef.current = map;

    // Global tab-switcher invoked from popup onclick attributes
    window.swt = (idx, dk, btn) => {
      const pu = document.getElementById('pu-' + idx);
      if (!pu) return;
      pu.querySelectorAll('.putc').forEach((t) => t.classList.remove('show'));
      const tb = document.getElementById('tb-' + idx);
      if (tb) {
        tb.querySelectorAll('.putb').forEach((b) => {
          b.classList.remove('act');
          b.style.background   = 'white';
          b.style.borderColor  = '#ddd';
          b.style.color        = '#888';
        });
      }
      const tc = document.getElementById('tc-' + idx + '-' + dk);
      if (tc) tc.classList.add('show');
      if (btn) {
        btn.classList.add('act');
        btn.style.background  = DEPTS[dk].h;
        btn.style.borderColor = DEPTS[dk].h;
        btn.style.color       = 'white';
      }
    };

    return () => {
      map.remove();
      leafletMapRef.current = null;
      delete window.swt;
    };
  }, [status]);

  // Re-render markers whenever filter or view mode changes
  useEffect(() => {
    if (status !== 'ready' || !leafletMapRef.current) return;
    const L   = window.L;
    const map = leafletMapRef.current;

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    if (viewMode !== 'map') return;

    const filtered = activeDept === 'all' ? locs : locs.filter((l) => l.d.includes(activeDept));
    filtered.forEach((loc, i) => {
      const m = L.marker([loc.lat, loc.lng], {
        icon:        makeIcon(L, loc.d),
        zIndexOffset: loc.d.length > 1 ? 600 : 0,
      })
        .bindPopup(makePopup(loc, i), { maxWidth: 275 })
        .addTo(map);
      markersRef.current.push(m);
    });
  }, [activeDept, viewMode, locs, status]);

  // Leaflet needs invalidateSize after the container transitions from hidden to visible
  useEffect(() => {
    if (viewMode !== 'map' || !leafletMapRef.current) return;
    const id = setTimeout(() => leafletMapRef.current?.invalidateSize(), 0);
    return () => clearTimeout(id);
  }, [viewMode]);

  const filtered = useCallback(
    () => (activeDept === 'all' ? locs : locs.filter((l) => l.d.includes(activeDept))),
    [activeDept, locs],
  );

  const visibleLocs = status === 'ready' ? filtered() : [];
  const count = visibleLocs.length;

  return (
    <div className="wpmap-page">
      <div className="container">
        {/* ── Header ── */}
        <div className="wpmap-hdr">
          <div className="wpmap-toprow">
            <span className="wpmap-pgtitle">Washington Program — Full Map</span>
            <div className="wpmap-vt">
              <button
                className={`wpmap-vb${viewMode === 'map' ? ' act' : ''}`}
                onClick={() => setViewMode('map')}
              >
                Map
              </button>
              <button
                className={`wpmap-vb${viewMode === 'list' ? ' act' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>

          <div className="wpmap-frow">
            <span className="wpmap-fl">Dept</span>
            {DEPT_ORDER.map((code) => (
              <button
                key={code}
                className={`wpmap-chip${activeDept === code ? ' act' : ''}`}
                onClick={() => setActiveDept(code)}
              >
                {code === 'all' ? 'All' : DEPTS[code].l}
              </button>
            ))}
          </div>
        </div>

        {/* ── Loading / error ── */}
        {status === 'loading' && (
          <div className="wpmap-status">Loading locations&hellip;</div>
        )}
        {status === 'error' && (
          <div className="wpmap-status wpmap-status--error">
            Unable to load location data
            <br />
            <small>{CSV_URL}</small>
            {errorMsg && (
              <>
                <br />
                <small>{errorMsg}</small>
              </>
            )}
          </div>
        )}

        {/* ── Map + list ── */}
        {status === 'ready' && (
          <>
            {/* Map container stays mounted; hidden via CSS when in list mode so
                Leaflet keeps its internal state intact */}
            <div
              ref={mapContainerRef}
              className="wpmap-map-c"
              style={{ display: viewMode === 'map' ? 'block' : 'none' }}
            />

            {viewMode === 'list' && (
              <div className="wpmap-list-c">
                <div className="wpmap-cg">
                  {visibleLocs.map((loc) => (
                    <div key={loc.n} className="wpmap-lc">
                      {loc.d.map((dk) => (
                        <span
                          key={dk}
                          className="wpmap-lbadge"
                          style={{ background: DEPTS[dk].bg, color: DEPTS[dk].dk }}
                        >
                          {DEPTS[dk].l}
                        </span>
                      ))}
                      <div className="wpmap-ltitle">{loc.n}</div>
                      <div className="wpmap-laddr">{loc.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="wpmap-cnt">
              {count} location{count !== 1 ? 's' : ''} shown
            </div>

            <div className="wpmap-leg">
              {Object.entries(DEPTS).map(([code, dept]) => (
                <div key={code} className="wpmap-li">
                  <div className="wpmap-ld" style={{ background: dept.h }} />
                  {dept.l}
                </div>
              ))}
              <div className="wpmap-li">
                <div
                  className="wpmap-ld"
                  style={{ background: 'white', border: '2px solid #2C2C2A', width: 11, height: 11 }}
                />
                Multiple Depts
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
