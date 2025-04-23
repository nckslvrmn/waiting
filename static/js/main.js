const TextUpdater = {
    init() {
        this.input = document.querySelector('input.main');
        this.cardText = document.querySelector('.centered.card_text');
        this.bindEvents();
        this.update();
    },

    bindEvents() {
        this.input.addEventListener('input', () => this.update());
    },

    update() {
        this.cardText.textContent = this.input.value;
    }
};

const BackgroundUpdater = {
    init() {
        this.select = document.querySelector('select');
        this.image = document.querySelector('img.card_text');
        this.bindEvents();
        this.update();
    },

    bindEvents() {
        this.select.addEventListener('change', () => this.update());
    },

    update() {
        this.image.src = this.select.value;
    }
};

const FontSizeUpdater = {
    init() {
        this.input = document.querySelector('input[type="number"]');
        this.wrapper = document.querySelector('.wrapper.card_text');
        this.bindEvents();
        this.update();
    },

    bindEvents() {
        this.input.addEventListener('input', () => this.update());
    },

    update() {
        this.wrapper.style.setProperty('--theme-fontSize', `${this.input.value}px`);
    }
};

const FontColorUpdater = {
    init() {
        this.input = document.querySelector('input[type="color"]');
        this.wrapper = document.querySelector('.wrapper.card_text');
        this.bindEvents();
        this.update();
    },

    bindEvents() {
        this.input.addEventListener('input', () => this.update());
    },

    update() {
        this.wrapper.style.setProperty('--theme-color', this.input.value);
    }
};

const DownloadHandler = {
    init() {
        this.downloadBtn = document.getElementById('downloadBtn');
        this.cardWrapper = document.querySelector('.wrapper.card_text');
        this.input = document.querySelector('input.main');
        this.backgroundSelect = document.querySelector('select');
        this.bindEvents();
    },

    bindEvents() {
        this.downloadBtn.addEventListener('click', () => this.downloadCard());
    },

    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
            .replace(/\-\-+/g, '-')      // Replace multiple - with single -
            .replace(/^-+/, '')          // Trim - from start of text
            .replace(/-+$/, '');         // Trim - from end of text
    },

    getFileName() {
        const text = this.input.value || 'untitled';
        const backgroundOption = this.backgroundSelect.selectedOptions[0];
        const backgroundName = backgroundOption ? backgroundOption.text : 'default';
        return `spongebob-${this.slugify(text)}-${this.slugify(backgroundName)}.png`;
    },

    async downloadCard() {
        try {
            const dataUrl = await htmlToImage.toPng(this.cardWrapper, {
                quality: 1.0,
                pixelRatio: 1,
                skipAutoScale: true,
                cacheBust: true,
            });

            const link = document.createElement('a');
            link.download = this.getFileName();
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TextUpdater.init();
    BackgroundUpdater.init();
    FontSizeUpdater.init();
    FontColorUpdater.init();
    DownloadHandler.init();
});
