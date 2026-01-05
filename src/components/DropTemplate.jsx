import React, { useEffect, useMemo, useState } from 'react';

export const DropTemplate = () => {
  const data = [
    {
      id: 1,
      name: 'Product One',
      img: 'https://static.zara.net/assets/public/34c8/749a/9fca4b1cb94e/084381ca8bf5/03443334922-a4/03443334922-a4.jpg?ts=1756460076456&w=538',
      price: 2999.99,
      // Use full ISO with seconds; add 'Z' if you want UTC. Without Z, it's local time.
      releaseDate: '2026-01-04T17:32:00',
      updateDate: '2026-01-03T17:45:00'
    },
    {
      id: 2,
      name: 'Product One',
      img: 'https://static.zara.net/assets/public/5bd0/2ee7/1d3e46eaadc4/b659b105ece5/00761311800-p/00761311800-p.jpg?ts=1762277338633&w=1125',
      price: 2999.99,
      // Use full ISO with seconds; add 'Z' if you want UTC. Without Z, it's local time.
      releaseDate: '2026-01-05T19:49:00',
      updateDate: '2026-01-03T17:40:00'
    }
  ];

  // --- DropCard subcomponent ---
  const DropCard = ({ item }) => {
    const GRID_COLS = 50;
    const GRID_ROWS = 70;
    const TOTAL_PIECES = GRID_COLS * GRID_ROWS;

    const pieces = useMemo(
      () => Array.from({ length: TOTAL_PIECES }, (_, i) => i),
      [TOTAL_PIECES]
    );

    const shuffledPieces = useMemo(() => {
      const str = String(item.releaseDate ?? '');
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }

      let seed = h >>> 0;
      const rand = () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };

      const arr = [...pieces];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }, [pieces, item.releaseDate]);

    const [timing, setTiming] = useState(() => {
      const now = Date.now();
      const releaseTime = new Date(item.releaseDate).getTime();
      const updateTime = new Date(item.updateDate).getTime();

      // fallback seguro
      if (!Number.isFinite(releaseTime)) {
        return {
          releaseTime: now,
          startTime: now,
          intervalMs: 0,
          nowMs: now
        };
      }

      // Si ya pasó el release → todo visible
      if (releaseTime <= now) {
        return {
          releaseTime,
          startTime: updateTime || now,
          intervalMs: 0,
          nowMs: now
        };
      }

      // ⏱️ tiempo TOTAL real del reveal
      const startTime = Number.isFinite(updateTime) ? updateTime : now;

      const totalTime = releaseTime - startTime;

      const perPiece =
        TOTAL_PIECES > 0
          ? Math.max(16, Math.floor(totalTime / TOTAL_PIECES))
          : 0;

      return {
        releaseTime,
        startTime,
        intervalMs: perPiece,
        nowMs: now
      };
    });

    useEffect(() => {
      const id = setInterval(() => {
        setTiming((t) => ({ ...t, nowMs: Date.now() }));
      }, 1000);
      return () => clearInterval(id);
    }, []);

    const remainingMs = Math.max(timing.releaseTime - timing.nowMs, 0);
    const isReleased = remainingMs <= 0;

    // --- Cálculo dropStartTime (clave) ---
    const dropStartTime = timing.startTime;

    const [revealedCount, setRevealedCount] = useState(0);

    useEffect(() => {
      if (!timing.intervalMs) {
        setRevealedCount(TOTAL_PIECES);
        return;
      }

      const now = Date.now();

      // 🔑 calcular progreso real basado en tiempo absoluto
      const alreadyRevealed = Math.floor(
        Math.max(0, (now - dropStartTime) / timing.intervalMs)
      );

      setRevealedCount(Math.min(TOTAL_PIECES, alreadyRevealed));

      const id = setInterval(() => {
        setRevealedCount((c) => (c < TOTAL_PIECES ? c + 1 : c));
      }, timing.intervalMs);

      return () => clearInterval(id);
    }, [timing.intervalMs, TOTAL_PIECES, dropStartTime]);

    const revealedSet = useMemo(
      () => new Set(shuffledPieces.slice(0, revealedCount)),
      [shuffledPieces, revealedCount]
    );

    const timeParts = useMemo(() => {
      const totalSeconds = Math.floor(remainingMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, '0');
      return {
        days,
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds)
      };
    }, [remainingMs]);

    return (
      <div className="w-full mb-6">
        <div className="cursor-pointer">
          <div className="relative w-full overflow-hidden rounded-sm">
            <img
              src={item.img}
              alt={item.name}
              className="object-cover w-full h-full"
            />

            {!isReleased && (
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`
                }}
              >
                {pieces.map((i) => (
                  <div
                    key={`puzzle-${item.id}-${i}`}
                    className={`bg-white transition-opacity duration-700 ${
                      revealedSet.has(i) ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {remainingMs > 0 ? (
            <div className="pt-3 pl-2 transition-all duration-500 ease-out translate-y-0 opacity-100">
              <p className="text-[11px] uppercase tracking-widest text-neutral-500">
                Drop in
              </p>
              <p className="text-[14px] font-medium text-neutral-900">
                {timeParts.days > 0
                  ? `${timeParts.days}d ${timeParts.hours}h ${timeParts.minutes}m ${timeParts.seconds}s`
                  : `${timeParts.hours}:${timeParts.minutes}:${timeParts.seconds}`}
              </p>
            </div>
          ) : (
            <div className="transition-all duration-500 ease-out translate-y-0 opacity-100">
              <div className="flex items-center justify-between gap-4 px-2 pt-2">
                <p className="text-[12px] font-light uppercase truncate text-neutral-800">
                  {item.name}
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-2.75 h-2.75 bg-blue-200 border border-neutral-200 rounded-xs"></div>{' '}
                  <p className="text-[12px] font-light uppercase text-neutral-800">
                    +5
                  </p>
                </div>
              </div>

              <p className="text-[12px] font-light uppercase text-neutral-800 pb-6 pl-2">
                $
                {new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(item.price)}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-800">
        New drops
      </p>
      {data.map((item) => (
        <DropCard key={item.id} item={item} />
      ))}
    </div>
  );
};
