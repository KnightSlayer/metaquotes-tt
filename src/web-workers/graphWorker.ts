onmessage = async function(e) {
  const { from, to, graph } = e.data;

  await new Promise(r => setTimeout(r, 222));

  postMessage({ from, to, graph });
}
