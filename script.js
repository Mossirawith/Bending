
    function toggleSection(type) {
      document.getElementById('u-section').classList.toggle('d-none', type !== 'u');
      document.getElementById('v-section').classList.toggle('d-none', type !== 'v');
    }

    function calculateU() {
      const l1 = parseFloat(document.getElementById('l1').value);
      const l2 = parseFloat(document.getElementById('l2').value);
      const l3 = parseFloat(document.getElementById('l3').value);
      const t = parseFloat(document.getElementById('thickness').value);
      const r = parseFloat(document.getElementById('r').value);
      const w = parseFloat(document.getElementById('width').value);

      if ([l1, l2, l3, t, r, w].some(isNaN)) {
        alert("กรุณากรอกค่าทุกช่องให้ครบก่อนคำนวณ");
        return;
      }

      const bend = (t + ((Math.PI * r / 2) * 0.4)) * 2;
      const length = l1 + l2 + l3 + bend;

      document.getElementById('resultLengthU').textContent = length.toFixed(1);
      document.getElementById('materialSizeU').textContent = `${t}x${w}x${length.toFixed(1)}`;
      document.getElementById('resultBoxU').classList.remove('d-none');

      localStorage.setItem('lastU', JSON.stringify({ l1, l2, l3, t, w, r, result: length.toFixed(1) }));
    }

    function resetU() {
      ['l1','l2','l3','thickness','width','r'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('resultLengthU').textContent = '-';
      document.getElementById('materialSizeU').textContent = '-';
      document.getElementById('resultBoxU').classList.add('d-none');
    }

    function loadLastU() {
  const data = JSON.parse(localStorage.getItem('lastU'));
  if (data) {
    document.getElementById('l1').value = data.l1 ?? '';
    document.getElementById('l2').value = data.l2 ?? '';
    document.getElementById('l3').value = data.l3 ?? '';
    document.getElementById('thickness').value = data.t ?? '';
    document.getElementById('width').value = data.w ?? '';
    document.getElementById('r').value = data.r ?? '';

    document.getElementById('resultLengthU').textContent = data.result;
    document.getElementById('materialSizeU').textContent = `${data.t}x${data.w}x${data.result}`;
    document.getElementById('resultBoxU').classList.remove('d-none');
  } else {
    alert("ยังไม่มีข้อมูลที่เคยคำนวณ");
  }
}


    function calculateV() {
      const l1 = parseFloat(document.getElementById('vleg1').value);
      const l2 = parseFloat(document.getElementById('vleg2').value);
      const t = parseFloat(document.getElementById('vthickness').value);
      const r = parseFloat(document.getElementById('vr').value);
      const w = parseFloat(document.getElementById('vwidth').value);

      if ([l1, l2, t, r, w].some(isNaN)) {
        alert("กรุณากรอกค่าทุกช่องให้ครบก่อนคำนวณ");
        return;
      }

      const bend = (t + ((Math.PI * r / 2) * 0.4)) * 2;
      const length = l1 + l2 + bend;

      document.getElementById('resultLengthV').textContent = length.toFixed(1);
      document.getElementById('materialSizeV').textContent = `${t}x${w}x${length.toFixed(1)}`;
      document.getElementById('resultBoxV').classList.remove('d-none');

      localStorage.setItem('lastV', JSON.stringify({ l1, l2, t, r, w, result: length.toFixed(1) }));
    }

    function resetV() {
      ['vleg1','vleg2','vthickness','vwidth','vr'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('resultLengthV').textContent = '-';
      document.getElementById('materialSizeV').textContent = '-';
      document.getElementById('resultBoxV').classList.add('d-none');
    }

    function loadLastV() {
  const data = JSON.parse(localStorage.getItem('lastV'));
  if (data) {
    document.getElementById('vleg1').value = data.l1 ?? '';
    document.getElementById('vleg2').value = data.l2 ?? '';
    document.getElementById('vthickness').value = data.t ?? '';
    document.getElementById('vwidth').value = data.w ?? '';
    document.getElementById('vr').value = data.r ?? '';

    document.getElementById('resultLengthV').textContent = data.result;
    document.getElementById('materialSizeV').textContent = `${data.t}x${data.w}x${data.result}`;
    document.getElementById('resultBoxV').classList.remove('d-none');
  } else {
    alert("ยังไม่มีข้อมูลที่เคยคำนวณ");
  }
}


    document.querySelectorAll('input.form-control').forEach(input => {
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      if (!document.getElementById('u-section').classList.contains('d-none')) {
        calculateU();
      } else if (!document.getElementById('v-section').classList.contains('d-none')) {
        calculateV();
      }
    }
  });
});
  