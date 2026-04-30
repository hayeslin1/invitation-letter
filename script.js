(function () {
  const form = document.getElementById("guest-form");
  const parkingSelect = document.getElementById("need-parking");
  const carPlateField = document.getElementById("car-plate-field");
  const carPlateInput = form ? form.querySelector('input[name="car_plate"]') : null;
  const status = document.getElementById("form-status");
  const supabaseUrl =
    (form && form.dataset.supabaseUrl) || "https://rbuwtmtnhtnnmycbqyud.supabase.co";
  const supabaseKey =
    (form && form.dataset.supabaseKey) || "sb_publishable_fXHfk9XBN7g_kOE5T-WiEw_oaTvVJDO";

  fetch(supabaseUrl + "/functions/v1/track-visit", {
    method: "POST",
    headers: {
      apikey: supabaseKey,
    },
    keepalive: true,
  }).catch(function () {
    console.warn("visit tracking failed");
  });

  if (!form || !parkingSelect || !carPlateField || !carPlateInput || !status) {
    return;
  }

  function toggleCarPlateField() {
    const needParking = parkingSelect.value === "true";
    carPlateField.classList.toggle("is-hidden", !needParking);
    carPlateInput.required = needParking;
    if (!needParking) {
      carPlateInput.value = "";
    }
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.dataset.state = type;
  }

  parkingSelect.addEventListener("change", toggleCarPlateField);
  toggleCarPlateField();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (!(submitButton instanceof HTMLButtonElement)) {
      return;
    }

    const formData = new FormData(form);
    const phone = String(formData.get("phone") || "").trim();
    const guestCount = Number(formData.get("guest_count") || 1);
    const needParking = formData.get("need_parking") === "true";
    const carPlate = String(formData.get("car_plate") || "").trim();

    if (!/^1\d{10}$/.test(phone)) {
      setStatus("请输入正确的 11 位手机号。", "error");
      return;
    }

    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
      setStatus("来宾人数请填写 1 到 20 之间的整数。", "error");
      return;
    }

    if (needParking && !carPlate) {
      setStatus("如需预留车位，请填写车牌号。", "error");
      return;
    }

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone,
      guest_count: guestCount,
      need_parking: needParking,
      car_plate: carPlate || null,
      notes: String(formData.get("notes") || "").trim() || null,
    };

    submitButton.disabled = true;
    setStatus("正在提交登记信息...", "pending");

    try {
      const response = await fetch(
        form.dataset.supabaseUrl + "/rest/v1/guest_registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: form.dataset.supabaseKey,
            Authorization: "Bearer " + form.dataset.supabaseKey,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "提交失败");
      }

      form.reset();
      parkingSelect.value = "false";
      toggleCarPlateField();
      setStatus("登记成功，感谢您的回复。", "success");
    } catch (error) {
      setStatus("提交失败，请稍后重试或电话联系。", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
})();
