import { ContactMenu } from "./contact-menu";

export function MobileFooter() {
  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="backdrop-blur-xl rounded-[2.5rem]">
        <ContactMenu variant="mobile" />
      </div>
    </div>
  );
}
