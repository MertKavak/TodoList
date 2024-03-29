import React from "react";
import { Box, Button, Container, Input, Select, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { listItem_Add } from "../actions/todolistActions";
import cities from "../data";
import { v4 as uuidv4 } from "uuid";

function TodoList() {
  const distpatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      newTitle: "",
      name: "",
      gender: [],
      cityname: "",
      districtName: "",
    },
    validationSchema: Yup.object({
      newTitle: Yup.string().required("Bu alan boş bırakılamaz"),
      name: Yup.string().required("Bu alan boş bırakılamaz"),
    }),
    onSubmit: (values, { resetForm }) => {
      const date = new Date();

      if (values.newTitle) {
        const id = uuidv4();
        distpatch(
          listItem_Add(
            id,
            values.newTitle,
            values.name,
            date,
            values.gender,
            values.cityname,
            values.districtName
          )
        );
        console.log(
          values.gender,
          values.newTitle,
          values.cityname,
          values.districtName
        );
        resetForm();
      }
    },
  });

  return (
    <>
      <Container className="todo-card">
        <Box>
          <h1>Görev Tanımla</h1>
          <h5>Şehir Seçiniz:</h5>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Select
             
              fontSize="1.7rem"
              mb="1rem"
              size="lg"
              onChange={(e) => formik.setFieldValue("cityname", e.target.value)}
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
                  value={formik.values.newTitle}
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
                border={formik.errors.name && "0.2rem solid #ff3c3c"}
                padding="1.5rem"
                fontSize="1.5rem"
                w="100%"
                mb="1rem"
                type="text"
                name="name"
                value={formik.values.name}
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
                Ekle
              </Button>
            </div>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default TodoList;
