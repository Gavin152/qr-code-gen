    let logoDataUrl = null;
    let activeTab = 'url';

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
    }

    function downloadQR() {
      qrCode.download({ name: 'qrcode', extension: downloadFormat });
    }

    // Live update on all inputs
    ['url-input','wifi-ssid','wifi-password'].forEach(id => {
      document.getElementById(id).addEventListener('input', update);
    });
    ['wifi-security','dot-style','corner-style'].forEach(id => {
      document.getElementById(id).addEventListener('change', update);
    });
