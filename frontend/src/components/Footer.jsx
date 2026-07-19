function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="my-3">
      <p className="text-center">Broadway &copy; {year}</p>
    </footer>
  );
}

export default Footer;
