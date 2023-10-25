import React, { useEffect, useState } from 'react';
import TagsService from '../../services/tagsService';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { FileParser } from '../../utils/FileParser';
import PostsService from '../../services/postsService';
import { createPost } from '../../store/postsSlice';
import { useDispatch } from 'react-redux';


function CreatePost() {

  const [allTags, setAllTags] = useState([]);

	const dispatch = useDispatch();

	let user = JSON.parse(localStorage.getItem('sm_user'));

	const VALID_TYPE = ['image/jpeg', 'image/png', 'image/jpg'];
	let KB = 1024;
	let MB = KB * 1024;

	useEffect(() => {
		TagsService.getAllTags()
			.then((res) => setAllTags(res.data))
			.catch((err) => console.log(err));
	}, []);

	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
			tags: [],
			image: '',
		},

		validationSchema: Yup.object({
			title: Yup.string().required('Field is required'),
			body: Yup.string().required('Field is required'),
			tags: Yup.array().min(1).required('Field is required'),
			image: Yup.mixed().required('Field is required')
				.test('fileSize', 'Wrong file size', (value) => value.size < MB * 2)
				.test('fileType', 'Wrong file type', (value) => VALID_TYPE.includes(value.type)),
		}),

		onSubmit: (values) => {
      
			values.tags = values.tags.map((el) => {
				return { name: el };
			});

			FileParser(values.image)
				.then((res) => {
					PostsService.createNewPost({
						...values,
						image: res,
						userId: user._id,
					})
						.then((res) => dispatch(createPost()))
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));

			// console.log(values);
			formik.resetForm();
		},
	});

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div className='border border-primary rounded-lg mt-7 flex flex-col bg-secondary shadow p-[10px]'>
			<h2 className='text-center'>Create A Memory</h2>

			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
				<label>Title: {' '} <span className='text-red-600 italic'>{showError('title')}</span> </label>
				<input type='text' name='title' value={formik.values.title} onChange={formik.handleChange} placeholder='Insert title...' className='bg-secondary border p-[7px] rounded-md' />

				<label>Message: {' '} <span className='text-red-600 italic'>{showError('body')}</span> </label>
				<input type='text' name='body' value={formik.values.body} onChange={formik.handleChange} placeholder='Insert message...' className='bg-secondary border p-[7px] rounded-md' />

				<label>Tags: {' '} <span className='text-red-600 italic'>{showError('tags')}</span> </label>
				<div className='grid grid-cols-3 gap-2'>
					{allTags.map((tag, i) => {
						return (
							<div key={i} className='flex gap-1 items-center'>
								<input type='checkbox' name='tags' value={tag.name} onChange={formik.handleChange} />
								<p>#{tag.name}</p>
							</div>);
					})}
				</div>

				<label>Image: {' '} <span className='text-red-600 italic'>{showError('image')}</span> </label>
				<input type='file' name='image' onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])} />

				<button className='p-[10px] bg-primary text-white rounded-lg mt-[15px]'>Create Post</button>
				<button className='p-[10px] bg-red-600 text-white rounded-lg mt-[5px]'>Clear</button>
			</form>
		</div>
  )
}

export default CreatePost;