<script>
    import { onMount } from 'svelte';
    
    let isHidden = false;

    function handleScroll() {
        if (typeof window === 'undefined') return;
        
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            isHidden = true;
        } else {
            isHidden = false;
        }
    }
</script>

<svelte:window on:scroll={handleScroll} />

<div class={`fixed bottom-[30px] left-0 w-screen flex justify-center z-[100] pointer-events-none transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`} id="scrollIndicator">
    <div class="bg-zinc-950/60 backdrop-blur-md border border-border-subtle text-text-muted rounded-full py-2 px-6 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[2px] animate-bounce shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        Scroll 
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M6 9l6 6 6-6"/></svg>
    </div>
</div>

<style>
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-15px); }
        60% { transform: translateY(-7px); }
    }
    
    .animate-bounce {
        animation: bounce 2s infinite;
    }
</style>
