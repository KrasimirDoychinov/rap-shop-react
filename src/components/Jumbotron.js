import OrangeButton from "./OrangeButton";

const Jumbotron = () => {
  return (
    <div class="jumbotron row text-center">
      <div class="container align-self-center">
        <h1 class="display-3 orange-text">WELCOME TO THE HIP-HOP WORLD</h1>
        <h5 className="text-uppercase mt-4 mb-3">
          Here you will find everything hip-hop related, from old school vinyls
          to the newest apparel from your favourite rappers
        </h5>
        <a href="#items">
          <OrangeButton text="SHOW ME WHAT YOU HAVE" />
        </a>
      </div>
    </div>
  );
};

export default Jumbotron;
