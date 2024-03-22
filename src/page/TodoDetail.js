import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listItem_Delete, listItem_Update } from "../actions/todolistActions";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cities from "../data";

function TodoDetail() {
  const { id } = useParams();
  console.log(id);
  const distpatch = useDispatch();
  const userListItem = useSelector((state) => state.userTodoList.userListItem);
  const selectedTodo = userListItem.find((todo) => todo.id === id);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newTitle: selectedTodo ? selectedTodo.title : "",
      name: selectedTodo ? selectedTodo.name : "",
      gender: selectedTodo ? selectedTodo.gender : "",
      cityname: selectedTodo ? selectedTodo.cityname : "",
      districtName: selectedTodo ? selectedTodo.districtName : "",
    },
    validationSchema: Yup.object({
      newTitle: Yup.string().required("Bu alan boş bırakılamaz"),
      name: Yup.string().required("Bu alan boş bırakılamaz"),
    }),
    onSubmit: (values) => {
      const date = new Date();

      if (selectedTodo) {
        distpatch(
          listItem_Update(selectedTodo.id, {
            title: values.newTitle,
            name: values.name,
            date,
            gender: values.gender,
            cityname: values.cityname,
            districtName: values.districtName,
          })
        );
      }
    },
  });

  const deleteTodo = () => {
    distpatch(listItem_Delete(selectedTodo.id));
    navigate("/");
  };

  if (!selectedTodo) {
    return <div style={{ marginTop: "5rem" }}>Görev bulunamadı.</div>;
  }
  return (
    <div className="todo-card">
      <div>
        <h1>Görevi Düzenle</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Select
              fontSize="1.7rem"
              mb="1rem"
              size="lg"
              onChange={(e) => formik.setFieldValue("cityname", e.target.value)}
              defaultValue={formik.values.cityname}
            >
              {cities.city.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>
          </div>
          <h5>İlçe Seçiniz:</h5>
          <Select
            fontSize="1.7rem"
            mb="1rem"
            size="lg"
            onChange={(e) =>
              formik.setFieldValue("districtName", e.target.value)
            }
            defaultValue={formik.values.districtName}
          >
            {formik.values.cityname &&
              cities.city
                .find((city) => city.name === formik.values.cityname)
                .districts.map((district) => (
                  <option key={district._id} value={district.name}>
                    {district.name}
                  </option>
                ))}
          </Select>

          <Box className="todo-input">
            <div>
              <div>
                <label>Görevi Tanımla:</label>
                <Input
                  border={formik.errors.newTitle && "0.2rem solid #ff3c3c"}
                  padding="1.5rem"
                  fontSize="1.5rem"
                  w="100%"
                  mb="1rem"
                  type="text"
                  name="newTitle"
                  defaultValue={formik.values.newTitle}
                  onChange={formik.handleChange}
                  placeholder="Yapılacakları buraya girin..."
                />
                {formik.errors.newTitle && (
                  <Text
                    color="#ff3c3c"
                    fontSize="1.6rem"
                    mt="0.5rem"
                    textAlign="right"
                  >
                    {formik.errors.newTitle}
                  </Text>
                )}
              </div>
              <label>Ad Soyad:</label>
              <Input
                defaultValue={formik.values.name}
                border={formik.errors.name && "0.2rem solid #ff3c3c"}
                padding="1.5rem"
                fontSize="1.5rem"
                w="100%"
                mb="1rem"
                type="text"
                name="name"
                onChange={formik.handleChange}
                placeholder="Ad soyad Giriniz..."
              />
              {formik.errors.name && (
                <Text
                  color="#ff3c3c"
                  fontSize="1.6rem"
                  mt="0.5rem"
                  textAlign="right"
                >
                  {formik.errors.name}
                </Text>
              )}
              <div style={{ marginBottom: "1rem" }}>
                <div>
                  <h4 style={{ marginBottom: "1rem" }}>Cinsiyet:</h4>
                  <input
                    type="radio"
                    id="male"
                    required
                    value="male"
                    name="gender"
                    checked={formik.values.gender === "male"}
                    onChange={() => formik.setFieldValue("gender", "male")}
                  ></input>
                  <label htmlFor="male">Erkek</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    name="gender"
                    checked={formik.values.gender === "female"}
                    onChange={() => formik.setFieldValue("gender", "female")}
                  ></input>
                  <label htmlFor="female">Kadın</label>
                </div>
              </div>
              <Button
                type="submit"
                colorScheme="blue"
                p="1.6rem"
                w="100%"
                fontSize="1.5rem"
              >
                Düzenle
              </Button>
              <Button
                type="button"
                colorScheme="red"
                mt="1rem"
                p="1.6rem"
                w="100%"
                fontSize="1.5rem"
                onClick={deleteTodo}
              >
                Sil
              </Button>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default TodoDetail;
