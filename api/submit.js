export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const data = req.body;

  const formData = new URLSearchParams();
  formData.append("name", data.name);
  formData.append("phone", data.phone);
  formData.append("date", data.date);
  formData.append("time", data.time);
  formData.append("service", data.service);
  formData.append("note", data.note);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbweSnMnJTjXBhB2YmMQ8wXdqo0Ow72uLEChPqWKTBl4bPc7oRayTYfMHyqKaz8weLlULw/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).send("Lỗi proxy: " + error.message);
  }
}
