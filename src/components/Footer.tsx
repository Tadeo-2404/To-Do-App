const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer-container">
      <p>all rights reserved {year} &copy;</p>
    </div>
  );
}

export default Footer;
