import { Component, useEffect, useState, type ReactNode } from 'react';
import { STATIONS, stationIndex, type ProductId, type StationId } from './content';
import { Chrome } from './ui/Chrome';
import { ReducedTour } from './ui/ReducedTour';
import { Storyboard } from './ui/Storyboard';
import { Stage } from './scene/Stage';

const DWELL_MS = 4400;

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

function webglOk() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function App() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const narrow = useMedia('(max-width: 767px)');
  const [station, setStation] = useState<StationId>('insumos');
  const [person, setPerson] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductId>('selecto');
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(() => !webglOk());
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      if (live) setFontsReady(true);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-reading', reduced || webglFailed || hash === '#diseno');
    return () => document.body.classList.remove('is-reading');
  }, [reduced, webglFailed, hash]);

  useEffect(() => {
    document.documentElement.dataset.station = station;
    document.documentElement.dataset.person = person ?? '';
  }, [station, person]);

  useEffect(() => {
    if (!playing || reduced) return;
    if (station === 'cupo') {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      const next = STATIONS[stationIndex(station) + 1];
      if (next) {
        setStation(next.id);
        setPerson(null);
      }
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [playing, station, reduced]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return;
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const index = stationIndex(station);
      const next = event.key === 'ArrowRight' ? STATIONS[index + 1] : STATIONS[index - 1];
      if (!next) return;
      setPlaying(false);
      setPerson(null);
      setStation(next.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [station]);

  const jump = (id: StationId) => {
    setPlaying(false);
    setPerson(null);
    setStation(id);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (station === 'cupo') {
      setPerson(null);
      setStation('insumos');
    }
    setPlaying(true);
  };

  if (reduced || webglFailed) {
    return <ReducedTour product={product} onProduct={setProduct} />;
  }

  if (hash === '#diseno') {
    return (
      <Storyboard
        onEnter={() => {
          window.location.hash = '#planta';
        }}
      />
    );
  }

  return (
    <main className="relative h-full overflow-hidden">
      <Guard onFail={() => setWebglFailed(true)}>
        <Stage
          station={station}
          person={person}
          product={product}
          reduced={false}
          narrow={narrow}
          fontsReady={fontsReady}
          onReady={() => setReady(true)}
          onPerson={(id) => setPerson((current) => (current === id ? null : id))}
          onStation={jump}
          onProduct={setProduct}
        />
      </Guard>
      <Chrome
        station={station}
        person={person}
        product={product}
        playing={playing}
        ready={ready}
        onStation={jump}
        onPerson={(id) => {
          setPerson((current) => (current === id ? null : id));
        }}
        onProduct={setProduct}
        onTogglePlay={togglePlay}
      />
    </main>
  );
}

class Guard extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
