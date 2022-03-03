onmessage = async function(e) {
  const { from, to, graph } = e.data;

  postMessage({ from, to, graph });
}
