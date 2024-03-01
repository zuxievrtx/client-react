import React, { useState, useEffect } from "react";
import App from "./App";
import axios from "axios";

export default function Siswa() {
  const dataAwal = {
    id: "",
    nama: "",
    alamat: "",
    email: "",
    nohp: "",
    foto: "",
  };
  const [data, setData] = useState(dataAwal);

  const [isEdit, setEdit] = useState(false);
  const [dataSiswa, setDataSiswa] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  const API = axios.create({
    baseURL: "http://localhost:8000/api/",
  });

  const getData = () => {
    API.get("siswa").then((response) => {
      setDataSiswa(response.data);
    });
  };
  const handleCreate = () => {
    setData(dataAwal);
    setEdit(false);
  };

  const handleChange = (e) => {
    if (e.target.type == "file") {
      let file = e.target.files[0];
      setData((data) => ({ ...data, foto: file }));
    } else {
      setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }
  };
  const handleEdit = async (id) => {
    const response = await API.get("siswa/" + id);
    setData(response.data.data); // Update the state with the received data
    setEdit(true);
  };

  const handleDelete = (id) => {
    API.delete("siswa/" + id).then((response) => {
      getData();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formdata = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    if (isEdit) {
      formdata.append("_method", "put");
      axios;
      API.post("siswa/" + data.id, formdata)
        .then((response) => {
          setEdit(false);
          setData(dataAwal);
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios;
      API.post("siswa/", formdata)
        .then((response) => {
          setData(dataAwal);
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="container-sm mt-3">
        <div className="d-grid gap-2 d-md-block bg-white rounded-4 shadow-sm p-4 mb-5">
          <div className="table-responsive">
            {/* tabel untuk menampilkan data dari database */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="" className="control-label">
                      Nama
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="nama"
                      value={data.nama || ""}
                      onChange={handleChange}
                      placeholder="Nama"
                      aria-label="default input example"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="control-label">
                      Alamat
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      name="alamat"
                      value={data.alamat || ""}
                      onChange={handleChange}
                      placeholder="Alamat"
                      aria-label="default input example"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="control-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      value={data.email || ""}
                      onChange={handleChange}
                      placeholder="Email"
                      aria-label="default input example"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="control-label">
                      No Hp
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="nohp"
                      value={data.nohp || ""}
                      onChange={handleChange}
                      placeholder="Nomer Hp"
                      aria-label="default input example"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="control-label">
                      Foto
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="foto"
                      placeholder="Foto"
                      onChange={handleChange}
                      aria-label="default input example"
                    ></input>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <button
                  onClick={handleCreate}
                  className="btn btn-primary mb-2 align-items-start"
                >
                  Tambah
                </button>
                <table
                  id="tabel-buku"
                  className="table table-bordered table-striped table-hover"
                  style={{ width: "100%" }}
                >
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">Foto</th>
                      <th className="text-center">Nama</th>
                      <th className="text-center">Alamat</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">NO HP</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSiswa.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={
                              "https://aws-s3-lks-test-site.s3.amazonaws.com/" +
                              item.foto
                            }
                            width="100"
                          />
                        </td>
                        <td>{item.nama}</td>
                        <td>{item.alamat}</td>
                        <td>{item.email}</td>
                        <td>{item.nohp}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="btn btn-primary me-1"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-danger"
                          >
                            HAPUS
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
