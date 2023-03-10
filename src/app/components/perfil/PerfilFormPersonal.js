import { Fragment, useEffect, useState } from "react";
import { useGlobal } from "../../contexts/globalContext";
import { API_USERS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
	Alert,
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault,
	InputLabel
} from "../../shared/components";
import SelectLabel from "../../shared/components/form/SelectLabel";
import { formIsValid, validateForm } from "../../shared/utils/generalFunctions";

const initialForm = {
	name: "",
	lastname: "",
	city: "",
	country: "",
	email: "",
};

const options = {
	country: [{ labelValue: "Perú" }],
	city: [
		{ labelValue: "Lima" },
		{ labelValue: "Arequipa" },
		{ labelValue: "Callao" },
	],
};

const PerfilFormPersonal = () => {
	const { setLoading, getUserDb, userId, setPopPup } = useGlobal();
	const { form, handleChange, setForm } = useForm(initialForm);
	const [error, setError] = useState(null);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [formReview, setFormReview] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getUserDb();
				if (data) {
					setForm(data.details);
				}
				setError(null);
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			}
		};
		getData();
	}, [getUserDb, setForm]);

	useEffect(() => {
		if (clickSubmit) {
			setFormReview(validateForm(form));
		}
	}, [form, clickSubmit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setClickSubmit(true);
		const res = formIsValid(form);
		if (res) {
			setLoading(true);
			const optionsPost = {
				body: {
					userId,
					details: form,
				},
			};
			await helpHttp().post(`${API_USERS}/save-details`, optionsPost);
			setLoading(false);
			setPopPup("Se guardo exitosamente!");
		} else {
			setPopPup("Debe completar todos los campos.");
		}
	};

	const handleSelectChange = (e) => {
		const { name, value } = e;
		setForm({ ...form, [name]: value });
	};

	return (
		<Fragment>
			{error && <Alert message={error.statusText} />}
			{userId && !error && (
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<ControlGrid columns={2} textAlign="initial">
							<InputLabel
								label="Nombres"
								name="name"
								placeholder="Ingrese sus nombres"
								value={form.name}
								onChange={handleChange}
								formReview={formReview}
							/>
							<InputLabel
								label="Apellidos"
								name="lastname"
								placeholder="Ingrese sus apellidos"
								value={form.lastname}
								onChange={handleChange}
								formReview={formReview}
							/>
						</ControlGrid>
						<ControlGrid columns={2} textAlign="initial">
							<SelectLabel
								label="Seleccione su País"
								name={"country"}
								options={options}
								onChange={handleSelectChange}
								value={form.country}
								formReview={formReview}
							/>
							<SelectLabel
								label="Seleccione su Ciudad"
								name={"city"}
								options={options}
								onChange={handleSelectChange}
								value={form.city}
								formReview={formReview}
							/>
						</ControlGrid>
						{/* <ControlGrid columns={2} textAlign="initial">
							<InputLabel
								label="País"
								name="country"
								placeholder="Ingrese su País"
								value={form.country}
								onChange={handleChange}
								formReview={formReview}
							/>
							<InputLabel
								label="Ciudad"
								name="city"
								placeholder="Ingrese su Ciudad"
								value={form.city}
								onChange={handleChange}
								formReview={formReview}
							/>
						</ControlGrid> */}
					</Fragment>
					<ControlGrid columns={3}>
						<ButtonPrimaryPurple type="submit">Guardar</ButtonPrimaryPurple>
					</ControlGrid>
				</FormDefault>
			)}
		</Fragment>
	);
};

export default PerfilFormPersonal;
