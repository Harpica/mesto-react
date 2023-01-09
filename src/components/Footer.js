function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        {String.fromCodePoint(0x00a9)} {year} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
