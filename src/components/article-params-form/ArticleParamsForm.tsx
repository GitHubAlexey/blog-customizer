import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApplySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const [settingsState, setSettingsState] =
		useState<ArticleStateType>(defaultArticleState);

	const [initialSettingsState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOpenSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleSettingsState = (selected: ArticleStateType) => {
		setSettingsState(selected);
	};

	const handleApplySettings = (event: SyntheticEvent) => {
		event.preventDefault();
		onApplySettings(settingsState);
	};

	const handleResetSettings = () => {
		setSettingsState(initialSettingsState);
		onApplySettings(initialSettingsState);
	};

	const formRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		onChange: setIsSidebarOpen,
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={handleOpenSidebar} openSidebar={isSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.containerOpen]: isSidebarOpen,
				})}>
				<div ref={formRef}>
					<form className={styles.form} onSubmit={handleApplySettings}>
						<Text size={31} weight={800} uppercase align='left'>
							задайте параметры
						</Text>
						<Select
							selected={settingsState.fontFamilyOption}
							options={fontFamilyOptions}
							title={'шрифт'}
							onChange={(selectedOption) =>
								handleSettingsState({
									...settingsState,
									fontFamilyOption: selectedOption,
								})
							}
						/>
						<RadioGroup
							name={'fontSizeOption'}
							options={fontSizeOptions}
							selected={settingsState.fontSizeOption}
							title={'размер шрифта'}
							onChange={(selectedOption) =>
								handleSettingsState({
									...settingsState,
									fontSizeOption: selectedOption,
								})
							}
						/>
						<Select
							selected={settingsState.fontColor}
							options={fontColors}
							title={'цвет шрифта'}
							onChange={(selectedOption) =>
								handleSettingsState({
									...settingsState,
									fontColor: selectedOption,
								})
							}
						/>
						<Separator />
						<Select
							selected={settingsState.backgroundColor}
							options={backgroundColors}
							title={'цвет фона'}
							onChange={(selectedOption) =>
								handleSettingsState({
									...settingsState,
									backgroundColor: selectedOption,
								})
							}
						/>
						<Select
							selected={settingsState.contentWidth}
							options={contentWidthArr}
							title={'ширина контента'}
							onChange={(selectedOption) =>
								handleSettingsState({
									...settingsState,
									contentWidth: selectedOption,
								})
							}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={handleResetSettings}
							/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</div>
			</aside>
		</>
	);
};
