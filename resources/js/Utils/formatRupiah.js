/**
 * Format angka menjadi format Rupiah
 * @param {number} angka - Angka yang akan diformat
 * @returns {string} - String dalam format Rupiah (contoh: Rp 1.000.000)
 */
export const formatRupiah = (angka) => {
    // Pastikan angka adalah angka dan bukan NaN
    if (isNaN(angka) || angka === null) return "Rp 0";

    // Convert angka menjadi string dan pisahkan bagian desimal
    const stringAngka = Math.round(angka).toString();

    // Format dengan pemisah ribuan
    const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(stringAngka);

    return formatted;
};
