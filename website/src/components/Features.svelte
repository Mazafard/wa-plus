<script>
    let featuresList;

    function scrollFeatures(direction) {
        if (!featuresList) return;
        const scrollAmount = featuresList.clientWidth * 0.5;
        featuresList.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
</script>

<section class="curtain-section z-[2] mt-[60vh]" id="features">
    <div class="container features-wrapper relative py-[100px] w-full max-w-[1200px]">
        <div class="text-center mb-[60px]">
            <h2 class="text-[48px] mb-4 tracking-[-1px] font-extrabold text-white">
                Powerful features, built for privacy
            </h2>
            <p class="text-xl text-text-muted">Everything you need to extract and manage your WhatsApp groups.</p>
        </div>

        <button class="slider-btn prev absolute left-[-20px] top-1/2 -translate-y-1/2 bg-surface border border-border-subtle w-12 h-12 rounded-full flex items-center justify-center text-text-main cursor-pointer z-10 hover:bg-white hover:text-bg-color hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] md:left-2" on:click={() => scrollFeatures(-1)} aria-label="Previous Feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div class="features flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2 no-scrollbar" bind:this={featuresList}>
            <div class="feature-card min-w-[340px] max-w-[380px] bg-zinc-950 border border-border-subtle rounded-3xl p-8 shrink-0 snap-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30 relative overflow-hidden group">
                <div class="feature-icon bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-none transition-shadow group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">🚀</div>
                <h3 class="text-2xl mb-4 font-semibold">Live Memory Extraction</h3>
                <p class="text-text-muted text-[16px] leading-[1.6] m-0">Bypass local databases completely. Extracts lightning fast straight from the internal React Fiber memory tree of WhatsApp Web. Pull thousands of contacts in a fraction of a second with perfect accuracy.</p>
            </div>
            <div class="feature-card min-w-[340px] max-w-[380px] bg-zinc-950 border border-border-subtle rounded-3xl p-8 shrink-0 snap-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30 relative overflow-hidden group">
                <div class="feature-icon bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-none transition-shadow group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">🔒</div>
                <h3 class="text-2xl mb-4 font-semibold">100% Privacy-First</h3>
                <p class="text-text-muted text-[16px] leading-[1.6] m-0">Data never leaves your browser. No servers, no external APIs, no tracking. Everything happens locally on your own machine.</p>
            </div>
            <div class="feature-card min-w-[340px] max-w-[380px] bg-zinc-950 border border-border-subtle rounded-3xl p-8 shrink-0 snap-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30 relative overflow-hidden group">
                <div class="feature-icon bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-none transition-shadow group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">📊</div>
                <h3 class="text-2xl mb-4 font-semibold">Beautiful Exports</h3>
                <p class="text-text-muted text-[16px] leading-[1.6] m-0">Export neatly formatted CSVs containing Names, Phone Numbers, Admin Statuses, Pushnames, and high-res Avatar URLs.</p>
            </div>
        </div>
        
        <button class="slider-btn next absolute right-[-20px] top-1/2 -translate-y-1/2 bg-surface border border-border-subtle w-12 h-12 rounded-full flex items-center justify-center text-text-main cursor-pointer z-10 hover:bg-white hover:text-bg-color hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] md:right-2" on:click={() => scrollFeatures(1)} aria-label="Next Feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
    </div>
</section>

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>
