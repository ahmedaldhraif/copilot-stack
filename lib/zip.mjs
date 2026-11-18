// Deterministic ZIP32 writer using STORE. Tiny text skill packages need no
// compression dependency. Fixed timestamps and byte ordering make releases reproducible.
export function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function makeZip(entries) {
  const ordered = [...entries].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  if (ordered.length > 65535) throw new Error('Too many ZIP entries');
  const locals = [], centrals = [], seen = new Set();
  let offset = 0;
  for (const entry of ordered) {
    if (!entry.path || entry.path.includes('\\') || entry.path.startsWith('/') || entry.path.split('/').some(p => !p || p === '..' || p === '.') || seen.has(entry.path)) {
      throw new Error(`Unsafe or duplicate ZIP path: ${entry.path}`);
    }
    seen.add(entry.path);
    const name = Buffer.from(entry.path, 'utf8');
    const data = Buffer.from(entry.data);
    if (name.length > 65535 || data.length >= 0xffffffff || offset >= 0xffffffff) throw new Error('ZIP32 limit exceeded');
    const checksum = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x800, 6); local.writeUInt16LE(33, 12); // 1980-01-01
    local.writeUInt32LE(checksum, 14); local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22); local.writeUInt16LE(name.length, 26);
    locals.push(local, name, data);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6); central.writeUInt16LE(0x800, 8);
    central.writeUInt16LE(33, 14); central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28); central.writeUInt32LE(offset, 42);
    centrals.push(central, name);
    offset += local.length + name.length + data.length;
  }
  const directory = Buffer.concat(centrals);
  if (offset + directory.length >= 0xffffffff) throw new Error('ZIP32 archive limit exceeded');
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(ordered.length, 8);
  end.writeUInt16LE(ordered.length, 10); end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, directory, end]);
}
