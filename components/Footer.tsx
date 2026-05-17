export default function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-4">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm text-muted">© {new Date().getFullYear()} Momin Shaikh. Built with Next.js, GSAP & Three.js.</p>
      </div>
    </footer>
  );
}
