// src/components/layout/footer.tsx
export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lifeline Connect. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Making a difference, one donation at a time.
        </p>
      </div>
    </footer>
  );
}
