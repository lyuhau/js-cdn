String.prototype.splitFull = function(delim, limit = Number.MAX_SAFE_INTEGER) {
  if (delim instanceof RegExp) {
    var reFlags = 'g';
    reFlags += delim.ignoreCase ? 'i' : '';
    reFlags += delim.multiline ? 'm' : '';
    delim = RegExp(delim.source, reFlags);

    let parts = [], start = 0, exec = undefined;
    while (exec = delim.exec(this)) {
      parts.push(this.slice(start, exec.index));
      parts.push(exec[0]);
      start = exec.index + exec[0].length;
    }
    parts.push(this.slice(start));

    const result = [];
    while (result.length < limit - 1 && parts.length >= 2) {
      const [part, _, ...rest] = parts;
      result.push(part);
      parts = rest;
    }
    result.push(parts.join(''));

    return result;
  }

  delim = delim.toString();
  const parts = this.split(delim);
  const result = parts.slice(0, limit - 1);
  if (parts.length > limit - 1) {
    result.push(parts.slice(limit - 1).join(delim));
  }
  return result;
};
