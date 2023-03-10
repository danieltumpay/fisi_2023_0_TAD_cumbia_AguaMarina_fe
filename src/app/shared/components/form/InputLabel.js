import { useEffect, useId, useState } from "react";
import {
	ContainerErrors, ContainerInputSelectLabelWithErrors, ContainerInputTextAreaLabel
} from "./StyledFormComponents";

const InputLabel = ({
	name,
	type = "text",
	placeholder,
	label,
	value,
	onChange,
	formReview,
	inputElement,
}) => {
	const inputId = useId();
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (formReview) {
			const res = formReview.find((e) => e.name === name);
			setErrors(res ? res.errors : []);
		}
	}, [formReview, name]);

	return (
		<ContainerInputSelectLabelWithErrors>
			<ContainerInputTextAreaLabel>
				<label htmlFor={inputId}>{label}</label>
				{inputElement ? (
					inputElement
				) : (
					<input
						id={inputId}
						type={type}
						placeholder={placeholder}
						name={name}
						value={value}
						onChange={onChange}
					/>
				)}
			</ContainerInputTextAreaLabel>
			{errors.length !== 0 && (
				<ContainerErrors>
					{errors.map((error, i) => (
						<span key={i} className="input-error">
							{error}
						</span>
					))}
				</ContainerErrors>
			)}
		</ContainerInputSelectLabelWithErrors>
	);
};

export default InputLabel;
