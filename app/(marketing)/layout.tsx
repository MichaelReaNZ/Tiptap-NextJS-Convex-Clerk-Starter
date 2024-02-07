// import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Top Navbar, Pricing, Contact Etc /> */}
      <main>{children}</main>
    </div>
  );
};

export default MarketingLayout;
