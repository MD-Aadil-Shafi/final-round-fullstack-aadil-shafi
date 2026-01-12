import asyncio
import random
from app.db.session import AsyncSessionLocal
from app.models.vendors import Vendor
from app.models.expenses import Expense


async def seed():
    async with AsyncSessionLocal() as session:
        async with session.begin():

            vendors = []
            for i in range(30):
                vendor = Vendor(
                    name = f"vendor_{i}",
                    about = f"About vendor {i}",
                    logo = "https://github.com/shadcn.png",
                    contact = f"vendor{i}@example.com",
                    owner_first_name = f"Owner{i}",
                    owner_last_name = f"Last{i}",
                    description = f"This is vendor {i} description",
                    location = "Florida" if i % 2 == 0 else "New York",
                    payment_type = "cash" if i % 2 == 0 else "credit_card",
                    department = "Engineering" if i % 3 == 0 else "Operations",
                    active = True,
                )
                session.add(vendor)
                vendors.append(vendor)

        for vendor in vendors:
            await session.refresh(vendor)
        await session.commit()
        

    print("Vendors seeded successfully")


if __name__ == "__main__":
    asyncio.run(seed())

# run like below in terminal by activation venv
#  python -m app.seeds.seedData