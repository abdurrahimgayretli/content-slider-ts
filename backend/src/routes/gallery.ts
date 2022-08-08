import express from "express";

import Gallery from "../controllers/gallery";

const router = express.Router();

router.post("/", Gallery.Create);
router.get("/:gallery_id", Gallery.Get);
router.get("/", Gallery.GetList);
router.put("/:gallery_id", Gallery.Update);
router.delete("/:gallery_id", Gallery.Delete);

export default router;
