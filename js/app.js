/* global StarsFX, ButterfliesFX, FlowersFX */
(() => {
    const scenes = Array.from(document.querySelectorAll(".scene"));
    const starsCanvas = document.getElementById("stars");
    const butterfliesCanvas = document.getElementById("butterflies");
    const flowerField = document.getElementById("flowerField");
    const song = document.getElementById("bgSong");

    let personName = "";

    const stars = StarsFX(starsCanvas);
    const butterflies = ButterfliesFX(butterfliesCanvas);
    const flowers = FlowersFX(flowerField);

    function setActiveScene(n) {
        scenes.forEach(s => s.classList.toggle("is-active", Number(s.dataset.scene) === n));

        if (n === 1) {
            stars.setMode("glow");
            stars.burst();
            butterflies.setEnabled(false);
            flowers.clear();
            if (song) {
                song.pause();
                song.currentTime = 0;
            }
        }

        if (n === 2) {
            stars.setMode("sparkle");
            butterflies.setEnabled(false);
            flowers.clear();
        }

        if (n === 3) {
            stars.setMode("sparkle");
            butterflies.setEnabled(false);
            flowers.clear();
        }

        if (n === 4) {
            stars.setMode("sparkle");
            butterflies.setEnabled(false);
            flowers.clear();
        }

        if (n === 5) {
            stars.setMode("romantic");
            butterflies.setEnabled(true);
            flowers.bloomField();
            // Automatically transition to scene 6 after 8 seconds
            setTimeout(() => {
                setActiveScene(6);
                stars.burst();
            }, 10000);
        }

        if (n === 6) {
            stars.setMode("soft");
            butterflies.setEnabled(true);
            const displayName = document.getElementById("displayName");
            if (displayName) {
                displayName.textContent = personName;
            }
        }
    }

    const btnContinue = document.getElementById("btnContinue");
    const btnReady = document.getElementById("btnReady");
    const btnSpark = document.getElementById("btnSpark");
    const btnCloseEyes = document.getElementById("btnCloseEyes");
    const btnToFinal = document.getElementById("btnToFinal");
    const btnReplay = document.getElementById("btnReplay");
    const nameInput = document.getElementById("nameInput");

    if (btnContinue) {
        btnContinue.addEventListener("click", () => {
            const name = nameInput.value.trim();
            if (name) {
                personName = name;
                setActiveScene(2);
                stars.burst();
            }
        });

        nameInput?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                btnContinue.click();
            }
        });
    }

    if (btnReady) {
        btnReady.addEventListener("click", () => {
            setActiveScene(3);
            stars.burst();
        });
    }

    if (btnSpark) {
        btnSpark.addEventListener("click", async () => {
            setActiveScene(4);
            stars.burst();
        });
    }

    if (btnCloseEyes) {
        btnCloseEyes.addEventListener("click", async () => {
            if (song) {
                try { await song.play(); } catch (e) { }
            }
            setActiveScene(5);
            stars.burst();
            butterflies.burst();
        });
    }



    if (btnReplay) {
        btnReplay.addEventListener("click", () => {
            setActiveScene(1);
            stars.burst();
        });
    }

    function resizeAll() {
        stars.resize();
        butterflies.resize();
    }

    window.addEventListener("resize", resizeAll);
    resizeAll();
    setActiveScene(1);
})();
