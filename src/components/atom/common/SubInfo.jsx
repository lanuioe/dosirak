const SubInfo = ({ children, svg, svgAlt }) => {
  return (
    <figure className="noto flex gap-1">
      <img
        src={`/assets/${svg}.svg`}
        alt={`${svgAlt} 아이콘`}
        className="w-[10px]"
      />
      <figcaption className="text-paragraph-sm text-gray700">
        {children}
      </figcaption>
    </figure>
  );
};

export default SubInfo;
