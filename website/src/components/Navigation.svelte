<script>
  import { onMount } from "svelte";

  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function scrollToSection(event, targetId) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    if (history.pushState) {
      history.pushState(null, null, "#" + targetId);
    } else {
      location.hash = "#" + targetId;
    }

    const oldPosition = target.style.position;
    target.style.position = "static";
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    target.style.position = oldPosition;

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    const duration = 800;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      if (timeElapsed > duration) timeElapsed = duration;

      // easeInOutQuad
      let t = timeElapsed / (duration / 2);
      let run;
      if (t < 1) {
        run = (distance / 2) * t * t + startPosition;
      } else {
        t--;
        run = (-distance / 2) * (t * (t - 2) - 1) + startPosition;
      }

      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);

    if (mobileMenuOpen) {
      mobileMenuOpen = false;
    }
  }
</script>

<div
  class={`fixed top-0 left-0 w-screen h-screen bg-zinc-950/98 backdrop-blur-md z-[999] flex flex-col items-center justify-center gap-10 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${mobileMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}
>
  <button
    class="absolute top-6 right-6 bg-transparent border-none text-text-main cursor-pointer p-2"
    on:click={toggleMobileMenu}
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="18" y1="6" x2="6" y2="18"></line><line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
      ></line></svg
    >
  </button>
  <a
    href="#hero"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "hero")}>Home</a
  >
  <a
    href="#features"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "features")}>Features</a
  >
  <a
    href="#how-it-works"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "how-it-works")}>How it Works</a
  >
  <a
    href="#download"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "download")}>Download</a
  >
  <a
    href="https://github.com/Mazafard/wa-plus"
    target="_blank"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={toggleMobileMenu}>Source Code</a
  >
  <div class="mt-5">
    <iframe
      src="https://github.com/sponsors/Mazafard/button"
      title="Sponsor Mazafard"
      height="32"
      width="114"
      style="border: 0; border-radius: 6px;"
    ></iframe>
  </div>
</div>

<nav
  class="sticky top-0 z-[100] px-6 py-4 mx-auto mt-5 max-w-[1152px] flex justify-between items-center bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
>
  <a
    href="#hero"
    class="logo text-2xl font-extrabold text-text-main no-underline flex items-center gap-3 tracking-tight"
    on:click={(e) => scrollToSection(e, "hero")}
  >
    <div
      class="bg-gradient-to-br from-primary to-emerald-400 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-outfit shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
    >
      WA
    </div>
    WA+
  </a>

  <div class="hidden md:flex gap-8 items-center">
    <a
      href="#features"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "features")}>Features</a
    >
    <a
      href="#how-it-works"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "how-it-works")}>How it Works</a
    >
    <a
      href="#download"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "download")}>Download</a
    >
  </div>

  <div class="flex gap-4 items-center hidden md:flex">
    <!-- GitHub Sponsor Button -->
    <iframe
      src="https://github.com/sponsors/Mazafard/button"
      title="Sponsor Mazafard"
      height="32"
      width="114"
      style="border: 0; border-radius: 6px;"
    ></iframe>

    <a
      href="https://github.com/Mazafard/wa-plus"
      class="bg-surface text-text-main border border-border-subtle py-2 px-5 text-sm rounded-lg hover:bg-zinc-800/80 hover:border-white/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all"
      >Source Code</a
    >
  </div>

  <button
    class="md:hidden bg-transparent border-none text-text-main cursor-pointer p-2"
    on:click={toggleMobileMenu}
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="3" y1="12" x2="21" y2="12"></line><line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
      ></line><line x1="3" y1="18" x2="21" y2="18"></line></svg
    >
  </button>
</nav>
