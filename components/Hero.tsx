import Image from "next/image";
import ButtonLead from "./ButtonLead";
import cheerbookmac from "@/app/cheer-book-mac.png";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          KDP Seek finds the most profitable book niches
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Input your interests, get the best book niche for you with low
          competition and high demand. Get keyword suggestions, competition
          analysis, and revenue potential estimates.
        </p>
        <ButtonLead />

        {/* <TestimonialsAvatars priority={true} /> */}
      </div>
      <div className="lg:w-full">
        <Image
          src={cheerbookmac}
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
