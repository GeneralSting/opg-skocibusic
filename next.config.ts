import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 restricts optimisation to this allowlist and coerces any other
    // `quality` prop to the nearest allowed value. Without 50 and 70 listed the
    // quality props on the hero, slider and product images silently became 75.
    qualities: [50, 70, 75],
    // Defaults plus 512. The gallery column renders at 486px on desktop, and
    // without a candidate between 384 and 640 the browser had to take 640 and
    // throw away 42% of it. Entries must stay below deviceSizes[0] (640).
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
  // Item pages merged or renamed when the catalogue was regrouped, so old links
  // and search results land on the page that now covers them
  async redirects() {
    return [
      {
        source: "/proizvodi-i-usluge/ugovorna-proizvodnja",
        destination: "/proizvodi-i-usluge/strojevi",
        permanent: true,
      },
      {
        source: "/proizvodi-i-usluge/terarij-100",
        destination: "/proizvodi-i-usluge/biljni-terariji",
        permanent: true,
      },
      {
        source: "/proizvodi-i-usluge/terarij-150",
        destination: "/proizvodi-i-usluge/biljni-terariji",
        permanent: true,
      },
      {
        source: "/proizvodi-i-usluge/presadnice-drveca",
        destination: "/proizvodi-i-usluge/sadnice-drveca",
        permanent: true,
      },
      {
        source: "/proizvodi-i-usluge/terariji",
        destination: "/proizvodi-i-usluge/biljni-terariji",
        permanent: true,
      },
      {
        // Mowing now sits under clearing overgrown land
        source: "/proizvodi-i-usluge/kosnja",
        destination: "/proizvodi-i-usluge/krcenje",
        permanent: true,
      },
      {
        // Eggs are no longer offered; the catalogue shows what is
        source: "/proizvodi-i-usluge/jaja",
        destination: "/proizvodi-i-usluge",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
