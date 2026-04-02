    let logoDataUrl = null;
    let activeTab = 'url';


    function saveSettings(settings) {
      try { localStorage.setItem('qr-settings', JSON.stringify(settings)); } catch (e) { /* silent — per D-07 */ }
    }

    function loadSettings() {
      try { const s = localStorage.getItem('qr-settings'); return s ? JSON.parse(s) : null; } catch (e) { return null; }
    }

    function saveAllSettings() {
      const logoToSave = (logoDataUrl !== null && logoDataUrl.length <= 500000) ? logoDataUrl : null;
      saveSettings({
        activeTab: activeTab,
        fgColor: document.getElementById('fg-color').value,
        bgColor: document.getElementById('bg-color').value,
        dotStyle: document.getElementById('dot-style').value,
        cornerStyle: document.getElementById('corner-style').value,
        logoSize: document.getElementById('logo-size').value,
        logoDataUrl: logoToSave,
        logoFileName: document.getElementById('logo-name').textContent,
        downloadFormat: downloadFormat,
        urlInput: document.getElementById('url-input').value,
        wifiSsid: document.getElementById('wifi-ssid').value,
        wifiSecurity: document.getElementById('wifi-security').value,
      });
    }

    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'canvas',
      data: 'https://example.com',
      dotsOptions: { color: '#000000', type: 'extra-rounded' },
      cornersSquareOptions: { color: '#000000', type: 'extra-rounded' },
      cornersDotOptions: { color: '#000000' },
      backgroundOptions: { color: '#ffffff' },
      imageOptions: { crossOrigin: 'anonymous', margin: 8, imageSize: 0.3, hideBackgroundDots: true },
      qrOptions: { errorCorrectionLevel: 'H' },
    });

    qrCode.append(document.getElementById('qr-canvas'));

    function getData() {
      if (activeTab === 'url') {
        return document.getElementById('url-input').value.trim() || 'https://example.com';
      } else {
        const ssid = document.getElementById('wifi-ssid').value;
        const password = document.getElementById('wifi-password').value;
        const security = document.getElementById('wifi-security').value;
        return `WIFI:T:${security};S:${ssid};P:${password};;`;
      }
    }

    function update() {
      const fg = document.getElementById('fg-color').value;
      const bg = document.getElementById('bg-color').value;
      const dotType = document.getElementById('dot-style').value;
      const cornerType = document.getElementById('corner-style').value;

      const logoSize = parseInt(document.getElementById('logo-size').value) / 100;
      qrCode.update({
        data: getData(),
        image: logoDataUrl || undefined,
        imageOptions: { crossOrigin: 'anonymous', margin: 8, imageSize: logoSize, hideBackgroundDots: true },
        dotsOptions: { color: fg, type: dotType },
        cornersSquareOptions: { color: fg, type: cornerType },
        cornersDotOptions: { color: fg },
        backgroundOptions: { color: bg },
      });
      saveAllSettings();
    }

    // Tab switching
    document.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.dataset.tab;
        document.getElementById('panel-' + activeTab).classList.add('active');
        update();
      });
    });

    // Color hex display
    document.getElementById('fg-color').addEventListener('input', e => {
      document.getElementById('fg-hex').textContent = e.target.value;
      update();
    });
    document.getElementById('bg-color').addEventListener('input', e => {
      document.getElementById('bg-hex').textContent = e.target.value;
      update();
    });

    // Logo upload
    document.getElementById('logo-input').addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        logoDataUrl = ev.target.result;
        document.getElementById('logo-name').textContent = file.name;
        document.getElementById('logo-clear').style.display = 'inline';
        document.getElementById('logo-size-field').style.display = 'block';
        update();
      };
      reader.readAsDataURL(file);
    });

    function clearLogo() {
      logoDataUrl = null;
      document.getElementById('logo-input').value = '';
      document.getElementById('logo-name').textContent = '';
      document.getElementById('logo-clear').style.display = 'none';
      document.getElementById('logo-size-field').style.display = 'none';
      update();
    }

    document.getElementById('logo-size').addEventListener('input', e => {
      document.getElementById('logo-size-val').textContent = e.target.value + '%';
      update();
    });

    let downloadFormat = 'png';

    function setFormat(fmt) {
      downloadFormat = fmt;
      document.getElementById('fmt-png').classList.toggle('active', fmt === 'png');
      document.getElementById('fmt-svg').classList.toggle('active', fmt === 'svg');
      saveAllSettings();
    }

    function downloadQR() {
      qrCode.download({ name: 'qrcode', extension: downloadFormat });
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme-preference', next); } catch(e) {}
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Live update on all inputs
    ['url-input','wifi-ssid','wifi-password'].forEach(id => {
      document.getElementById(id).addEventListener('input', update);
    });
    ['wifi-security','dot-style','corner-style'].forEach(id => {
      document.getElementById(id).addEventListener('change', update);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const saved = loadSettings();
      if (!saved) return;

      // Restore active tab (D-05, D-06, PERS-04)
      if (saved.activeTab && saved.activeTab !== activeTab) {
        activeTab = saved.activeTab;
        document.querySelectorAll('.tab').forEach(t => {
          t.classList.toggle('active', t.dataset.tab === activeTab);
        });
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        document.getElementById('panel-' + activeTab).classList.add('active');
      }

      // Restore colors (PERS-01)
      if (saved.fgColor) {
        document.getElementById('fg-color').value = saved.fgColor;
        document.getElementById('fg-hex').textContent = saved.fgColor;
      }
      if (saved.bgColor) {
        document.getElementById('bg-color').value = saved.bgColor;
        document.getElementById('bg-hex').textContent = saved.bgColor;
      }

      // Restore dot and corner styles (PERS-01)
      if (saved.dotStyle) document.getElementById('dot-style').value = saved.dotStyle;
      if (saved.cornerStyle) document.getElementById('corner-style').value = saved.cornerStyle;

      // Restore logo (D-03, D-05)
      if (saved.logoDataUrl) {
        logoDataUrl = saved.logoDataUrl;
        document.getElementById('logo-name').textContent = saved.logoFileName || 'logo.png';
        document.getElementById('logo-clear').style.display = 'inline';
        document.getElementById('logo-size-field').style.display = 'block';
      }

      // Restore logo size (PERS-02)
      if (saved.logoSize) {
        document.getElementById('logo-size').value = saved.logoSize;
        document.getElementById('logo-size-val').textContent = saved.logoSize + '%';
      }

      // Restore download format (D-04)
      if (saved.downloadFormat) {
        downloadFormat = saved.downloadFormat;
        document.getElementById('fmt-png').classList.toggle('active', downloadFormat === 'png');
        document.getElementById('fmt-svg').classList.toggle('active', downloadFormat === 'svg');
      }

      // Restore content fields (D-02)
      if (saved.urlInput) document.getElementById('url-input').value = saved.urlInput;
      if (saved.wifiSsid) document.getElementById('wifi-ssid').value = saved.wifiSsid;
      if (saved.wifiSecurity) document.getElementById('wifi-security').value = saved.wifiSecurity;
      // wifi-password deliberately NOT restored (D-02)

      // Trigger QR code update to reflect restored settings (D-05)
      update();
    });
