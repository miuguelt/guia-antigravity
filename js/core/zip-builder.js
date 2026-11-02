/* Micro-generador determinista de archivos PKZIP (.zip) sin dependencias externas (Offline-First) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CRC_TABLE = (function () {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c >>> 0;
    }
    return table;
  })();

  function encodeUtf8(str) {
    const text = String(str == null ? '' : str);
    if (typeof TextEncoder !== 'undefined') {
      return new TextEncoder().encode(text);
    }
    const out = [];
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt(i);
      if (code < 0x80) out.push(code);
      else if (code < 0x800) out.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
      else out.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
    return new Uint8Array(out);
  }

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function writeU16(buf, offset, val) {
    buf[offset] = val & 0xff;
    buf[offset + 1] = (val >>> 8) & 0xff;
  }

  function writeU32(buf, offset, val) {
    buf[offset] = val & 0xff;
    buf[offset + 1] = (val >>> 8) & 0xff;
    buf[offset + 2] = (val >>> 16) & 0xff;
    buf[offset + 3] = (val >>> 24) & 0xff;
  }

  function createZipBuffer(files) {
    const entries = (Array.isArray(files) ? files : []).map(function (item) {
      const nameBytes = encodeUtf8(item.filename || 'archivo.txt');
      const dataBytes = item.content instanceof Uint8Array ? item.content : encodeUtf8(item.content || '');
      return {
        nameBytes: nameBytes,
        dataBytes: dataBytes,
        crc: crc32(dataBytes)
      };
    });

    let localSize = 0;
    let centralSize = 0;
    entries.forEach(function (e) {
      localSize += 30 + e.nameBytes.length + e.dataBytes.length;
      centralSize += 46 + e.nameBytes.length;
    });

    const totalSize = localSize + centralSize + 22;
    const out = new Uint8Array(totalSize);
    let localOffset = 0;
    let centralOffset = localSize;

    entries.forEach(function (e) {
      const nLen = e.nameBytes.length;
      const dLen = e.dataBytes.length;
      const entryOffset = localOffset;

      writeU32(out, localOffset, 0x04034b50);
      writeU16(out, localOffset + 4, 20);
      writeU16(out, localOffset + 6, 0x0800);
      writeU16(out, localOffset + 8, 0);
      writeU16(out, localOffset + 10, 0x5400);
      writeU16(out, localOffset + 12, 0x5d61);
      writeU32(out, localOffset + 14, e.crc);
      writeU32(out, localOffset + 18, dLen);
      writeU32(out, localOffset + 22, dLen);
      writeU16(out, localOffset + 26, nLen);
      writeU16(out, localOffset + 28, 0);
      out.set(e.nameBytes, localOffset + 30);
      out.set(e.dataBytes, localOffset + 30 + nLen);
      localOffset += 30 + nLen + dLen;

      writeU32(out, centralOffset, 0x02014b50);
      writeU16(out, centralOffset + 4, 20);
      writeU16(out, centralOffset + 6, 20);
      writeU16(out, centralOffset + 8, 0x0800);
      writeU16(out, centralOffset + 10, 0);
      writeU16(out, centralOffset + 12, 0x5400);
      writeU16(out, centralOffset + 14, 0x5d61);
      writeU32(out, centralOffset + 16, e.crc);
      writeU32(out, centralOffset + 20, dLen);
      writeU32(out, centralOffset + 24, dLen);
      writeU16(out, centralOffset + 28, nLen);
      writeU16(out, centralOffset + 30, 0);
      writeU16(out, centralOffset + 32, 0);
      writeU16(out, centralOffset + 34, 0);
      writeU16(out, centralOffset + 36, 0);
      writeU32(out, centralOffset + 38, 0);
      writeU32(out, centralOffset + 42, entryOffset);
      out.set(e.nameBytes, centralOffset + 46);
      centralOffset += 46 + nLen;
    });

    const eocd = localSize + centralSize;
    writeU32(out, eocd, 0x06054b50);
    writeU16(out, eocd + 4, 0);
    writeU16(out, eocd + 6, 0);
    writeU16(out, eocd + 8, entries.length);
    writeU16(out, eocd + 10, entries.length);
    writeU32(out, eocd + 12, centralSize);
    writeU32(out, eocd + 16, localSize);
    writeU16(out, eocd + 20, 0);

    return out;
  }

  return {
    encodeUtf8: encodeUtf8,
    crc32: crc32,
    createZipBuffer: createZipBuffer
  };
});
