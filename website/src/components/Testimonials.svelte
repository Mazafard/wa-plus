<script>
  // Note: Chrome Web Store does not provide a public CORS-enabled API to fetch reviews dynamically from the browser.
  // We statically define these here so you can easily update them as you receive real reviews on the store!
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Community Manager",
      text: "This extension saved me hours of manual data entry. Absolute lifesaver for our large WhatsApp groups!",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Event Organizer",
      text: "Fast, private, and works flawlessly. Love that it processes everything locally without sending data anywhere.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Small Business Owner",
      text: "Exactly what I was looking for. The CSV export is perfectly formatted and ready to use in Excel immediately.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Sales Director",
      text: "We use this to manage our client communication channels. It's incredibly reliable and the privacy focus is a huge plus.",
      rating: 5,
    },
    {
      name: "Elena Petrova",
      role: "Digital Marketer",
      text: "The best tool for WhatsApp group management. Tried others but this one is by far the fastest and cleanest.",
      rating: 5,
    },
    {
      name: "Michael Chang",
      role: "Support Team Lead",
      text: "Beautiful interface and does exactly what it promises. Has become an essential part of my daily workflow.",
      rating: 5,
    }
  ];

  let reviewsList;

  function scrollReviews(direction) {
    if (!reviewsList) return;
    const scrollAmount = reviewsList.clientWidth * 0.8;
    reviewsList.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
</script>

<section class="curtain-section z-[2]" id="testimonials">
  <div class="container mx-auto px-6 py-24 max-w-[1200px]">
    <!-- Top Header & Stars -->
    <div class="text-center mb-16 flex flex-col items-center">
      <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-white/10 mb-6 shadow-lg backdrop-blur-sm">
        <div class="flex gap-1 text-amber-400">
          <svg class="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <svg class="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <svg class="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <svg class="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <svg class="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </div>
        <span class="text-white font-semibold text-[15px] tracking-wide">5.0 Rating on Chrome Web Store</span>
      </div>
      <h2 class="text-4xl md:text-[46px] font-extrabold text-white mb-6 tracking-tight leading-tight">
        What others say about us
      </h2>
      <p class="text-xl text-text-muted max-w-[600px] mx-auto">
        Join the growing community of professionals who trust WA+ for their group management.
      </p>
    </div>

    <!-- Horizontal scroll container -->
    <div class="relative w-full overflow-hidden">
      <!-- Gradient masks for smooth fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none"></div>
      
      <button class="slider-btn prev absolute left-2 top-1/2 -translate-y-1/2 bg-surface border border-border-subtle w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-text-main cursor-pointer z-20 hover:bg-white hover:text-bg-color hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] md:left-6" on:click={() => scrollReviews(-1)} aria-label="Previous Review">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <button class="slider-btn next absolute right-2 top-1/2 -translate-y-1/2 bg-surface border border-border-subtle w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-text-main cursor-pointer z-20 hover:bg-white hover:text-bg-color hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] md:right-6" on:click={() => scrollReviews(1)} aria-label="Next Review">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div class="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar px-14 md:px-24" bind:this={reviewsList}>
        {#each reviews as review}
          <div class="flex-none w-[340px] md:w-[380px] snap-center bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:bg-zinc-800/60 hover:border-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
            <div class="flex gap-1 text-amber-400 mb-5">
              {#each Array(review.rating) as _}
                <svg class="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              {/each}
            </div>
            <p class="text-white/90 text-[17px] leading-relaxed mb-8 italic">"{review.text}"</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 class="text-white font-semibold text-[15px] m-0">{review.name}</h4>
                <p class="text-text-muted text-[13px] m-0 mt-1">{review.role}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
