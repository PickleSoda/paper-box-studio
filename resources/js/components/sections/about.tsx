import pilot from "../assets/pilot.png";

interface AboutProps {
  title: string;
  description: string;
  stats: {
    quantity: string;
    description: string;
  }[];
}

export const About: React.FC<AboutProps> = ({ title, description, stats }) => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  {title}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">{description}</p>
            </div>

            <Statistics stats={stats} />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatisticsProps {
  stats: {
    quantity: string;
    description: string;
  }[];
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
