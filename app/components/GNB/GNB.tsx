import LogoImage from './LogoImage';
import NavItemList from './navItemList';
import ProfileSection from './profileSection';

export function GNB() {
  return (
    <section className="fixed top-0 z-50 w-full border-b-2 border-gray-900 bg-orange-600">
      <nav className="mx-auto flex h-14 max-w-screen-desktop px-4 tablet:px-6 desktop:p-0">
        <LogoImage />
        <NavItemList />
        <ProfileSection />
      </nav>
    </section>
  );
}
