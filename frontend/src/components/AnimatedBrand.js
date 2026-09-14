function AnimatedBrand({ text }) {
  return (
    <span className="nav-brand-text" aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="brand-letter"
          style={{ animationDelay: `${index * 0.07}s` }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default AnimatedBrand;
