document.getElementById('downloadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('videoUrl').value;

  const response = await fetch('/api/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });

  const data = await response.json();
  const result = document.getElementById('result');
  if (data.success) {
    result.innerHTML = `<a href="${data.download}" class="btn btn-success" target="_blank">Click to download</a>`;
  } else {
    result.innerHTML = `<div class="alert alert-danger">Error: ${data.error}</div>`;
  }
});
