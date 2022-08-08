import React from "react";
import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useGallery } from "../../context/GalleryContext";
import { postGallery } from "../../api";
import validationSchema from "./validations";

export default function Form() {
  const gallery = useGallery();

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      url: "",
      duration: 0,
    },
    validationSchema,
    onSubmit: async (values, bag: any) => {
      try {
        gallery.push({
          name: values.name,
          type: values.type,
          url: values.url,
          duration: values.duration * 1000,
        });
        await postGallery({
          name: values.name,
          type: values.type,
          url: values.url,
          duration: values.duration * 1000,
        });
      } catch (e: any) {
        bag.setErrors({ general: e.response.data.message });
      }
      bag.resetForm();
    },
  });
  return (
    <div className="form">
      <Flex
        align="center"
        justify="right"
        width={"full"}
        justifyContent="center"
      >
        <Box p={6} rounded="md">
          <Box textAlign="center">
            <Heading>Add Content</Heading>
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="name">Name:</FormLabel>
                <Input
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                />
                {formik.errors.name && formik.touched.name && (
                  <Alert status="error">{formik.errors.name}</Alert>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="type">Type</FormLabel>
                <Select
                  id="type"
                  name="type"
                  placeholder="Select type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.type && Boolean(formik.errors.type)}
                >
                  <option value={"img"}>Image</option>
                  <option value={"mp4"}>Video</option>
                </Select>
                {formik.errors.type && formik.touched.type && (
                  <Alert status="error">{formik.errors.type}</Alert>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="url">URL</FormLabel>
                <Input
                  id="url"
                  name="url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.url}
                  isInvalid={formik.touched.url && Boolean(formik.errors.url)}
                />
                {formik.errors.url && formik.touched.url && (
                  <Alert status="error">{formik.errors.url}</Alert>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="duration">Duration:</FormLabel>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                  isInvalid={formik.touched.duration && Boolean(formik.errors.duration)}
                />
                {formik.errors.duration && formik.touched.duration && (
                  <Alert status="error">{formik.errors.duration}</Alert>
                )}
              </FormControl>
              <Button mt={5} type="submit" colorScheme={"purple"} width="full">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
