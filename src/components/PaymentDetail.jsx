/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentDetail() {
  const [id] = useState(useParams().id);
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    fetchDetailList();
  }, []);

  const fetchDetailList = () => {
    axios.get(`/detailTransactionInfo/${id}`).then((response) => {
      console.log(response.data.data);
      setTransaksi([response.data.data[0]]);
    });
  };

  return (
    <>
      {transaksi.map((transaksi, key) => {
        return (
          <div key={key}>
            <p>nomor transaksi = {id}</p>
            <p>status = {transaksi.status}</p>
            <p>informasi = {transaksi.information}</p>
            <p>subtotal = {transaksi.subtotal}</p>
            <p>biaya layanan = {transaksi.biaya_layanan}</p>
            <p>ongkir = {transaksi.ongkir}</p>
            <p>total belanja = {transaksi.total}</p>
            {/* ini nestes yang artinya datanya ada array lagi didalam array, apinya bisa cek di collection info detail transaksi, infokan arga kalau bingung */}
            {transaksi.transaction_details.map((product, key1) => {
              return (
                <div key={key1}>
                  <h2>Detail Produk:</h2>
                  <p>nama product: {product.product.product}</p>
                  <p>berat product: {product.product.product_weight}</p>
                  <p>harga product: {product.product.price}</p>
                  <p>quantitas product: {product.product.qty}</p>
                  <p>harga total produk: {product.product.price_total}</p>
                  <p>Foto produk: </p>
                  <img
                    src={
                      "http://127.0.0.1:8000/images/" + product.product.image
                    }
                    alt="Product Thumbnail"
                    className="img-fluid"
                  />
                </div>
              );
            })}
            {transaksi.courier_info.map((courier, key2) => {
              return (
                <div key={key2}>
                  <h2>Info Kurir:</h2>
                  <p>nama ekspedisi: {courier.name}</p>
                  <p>jenis layanan ekspedisi: {courier.service}</p>
                  <p>deskripsi ekspedisi: {courier.description}</p>
                  <p>ongkir ekspedisi: {courier.cost}</p>
                  <p>estimasi paket diterima: {courier.etd}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
