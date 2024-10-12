const Description = ({ data, selected }) => {
  const crop = (string, maxlength) => string.substring(0, maxlength);

  return (
    <div className="descriptions">
      {data.map((project, index) => {
        const { title } = project;
        return (
          <div
            key={index}
            className="description"
            style={{
              clipPath:
                selected === index ? "inset(0 0 0 0)" : "inset(50% 0 50%)",
            }}
          >
            <p className="text-customOrange uppercase font-bold text-[7vw] leading-[0vw] relative z-[1] m-0">
              {crop(title, 9)}
            </p>
            <p className="w-2/5 text-[1vw] font-bold text-customOrange" />
            <p className="w-2/5 text-[1vw] font-bold text-customOrange" />
          </div>
        );
      })}
    </div>
  );
};

export default Description;
