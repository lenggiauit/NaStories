
GO
--- Delete from [dbo].[Permission]
--- Select * from [dbo].[Permission]
INSERT INTO [dbo].[Permission]
           ([Id]
           ,[Name]
           ,[Code]
           ,[Description]
           ,[IsActive]
           ,[CreatedDate] )
     VALUES
           --(NEWID()
           --,'Admin'
           --,'Admin'
           --,'Admin'
           --,1
           --,GETDATE()
           -- ),
			(NEWID()
           ,'CreateEditCategory'
           ,'CreateEditCategory'
           ,'CreateEditCategory'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'CreateEditBlogPost'
           ,'CreateEditBlogPost'
           ,'CreateEditBlogPost'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'ManageUser'
           ,'ManageUser'
           ,'ManageUser'
           ,1
           ,GETDATE()
            ) 



GO


